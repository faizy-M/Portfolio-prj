const express = require("express");
const router = express.Router();
const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
const path = require("path");

const vet = require("../../models/Veteran");
const Veteran = vet.Veteran;
const VeteranPost = vet.VeteranPost;
const VeteranFollower = vet.VeteranFollower;
const validator = require("../../validation/Auth");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const keys = require("../../config/keys");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "images");
  },
  filename: function (req, file, cb) {
    cb(null, uuidv4() + "-" + Date.now() + path.extname(file.originalname));
  },
});

const fileFilter = (req, file, cb) => {
  const allowedFileTypes = ["image/jpeg", "image/jpg", "image/png"];
  if (allowedFileTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

let upload = multer({
  storage,
  fileFilter,
  limits: { fieldSize: 1024 * 1024 * 25 },
});

// @route   /api/veterans
// @desc    Get All Veterans
// @access  Public
router.get("/", async (req, res) => {
  console.log(req.query);
  Veteran.find(
    { name: { $regex: req.query.query || "", $options: "i" } },
    "name email _id image"
  ).then((veterans) => res.json(veterans));
});

// get veteran by id
router.get("/:id", async (req, res) => {
  // get veteran excluding posts
  console.log(req.params.id);
  Veteran.findById(
    req.params.id,
    "name created_organizations email _id image hobbies address"
  )
    // populate veteran created organizations
    .populate({
      path: "created_organizations",
      select: "name",
    })
    .then((veteran) => {
      console.log(veteran);
      res.json(veteran);
    });
});

// fetch veteran posts of between two dates
router.get("/:id/posts", async (req, res) => {
  // get veterenposts whose posts were created between two dates and populate them with post
  VeteranPost.find({
    veteran: req.params.id,
    created_at: {
      $gte: req.query.start,
      $lte: req.query.end,
    },
  })
    .populate("Post")
    .then((veteranPosts) => res.json(veteranPosts));
});

// get followers of a veteran
router.get("/:id/followers", async (req, res) => {
  // get followers of a veteran
  VeteranFollower.find({ veteran: req.params.id })
    // populate followers
    .populate("follower")
    .then((followers) => {
      return res.json(followers);
    });
});

// add a VeteranFollower
router.post("/:id/followers", async (req, res) => {
  Veteran.findById(req.params.id).then((veteran) => {
    console.log(req.body);
    const newFollower = new VeteranFollower({
      veteran: veteran._id,
      follower: req.body.follower,
    });
    newFollower
      .save()
      .then((follower) => {
        res.json(follower);
      })
      .catch((err) => console.log(err));
  });
});

// delete a VeteranFollower
router.delete("/:id/followers/:followerId", async (req, res) => {
  VeteranFollower.findOneAndDelete({
    veteran: req.params.id,
    follower: req.params.followerId,
  }).then((veteranFollower) => res.json(veteranFollower));
});

// update veteran
router.put("/:id", upload.single("image"), async (req, res) => {
  const veteran = await Veteran.findById(req.params.id);
  if (req.body.name) veteran.name = req.body.name;
  if (req.body.email) veteran.email = req.body.email;
  if (req.body.password) veteran.password = req.body.password;
  if (req.body.profession) veteran.profession = req.body.profession;
  if (req.body.hobbies) veteran.hobbies = req.body.hobbies;
  if (req.body.location) veteran.location = req.body.location;
  if (req.file) veteran.image = req.file.filename;
  veteran
    .save()
    .then((veteran) => res.json(veteran))
    .catch((err) => console.log(err));
});

// delete a veteran
router.delete("/:id", async (req, res) => {
  const veteran = await Veteran.findById(req.params.id);
  veteran.remove().then(() => res.json({ success: true }));
});

// find veterans within a radius
router.get("/nearby", async (req, res) => {
  const { lat, lng, radius } = req.query;
  const point = {
    type: "Point",
    coordinates: [parseFloat(lng), parseFloat(lat)],
  };
  const options = {
    spherical: true,
    maxDistance: radius * 1609.34,
    num: 10,
  };
  Veteran.geoNear(point, options, (err, results) => {
    if (err) {
      console.log(err);
    } else {
      res.json(results);
    }
  });
});

// find veterans in same city and same profession
router.get("/same", async (req, res) => {
  const { lat, lng, profession } = req.query;
  const point = {
    type: "Point",
    coordinates: [parseFloat(lng), parseFloat(lat)],
  };
  const options = {
    spherical: true,
    maxDistance: 5000,
    num: 10,
  };
  Veteran.geoNear(point, options, (err, results) => {
    if (err) {
      console.log(err);
    } else {
      const filtered = results.filter((veteran) => {
        return veteran.obj.profession === profession;
      });
      return res.json(filtered);
    }
  });
});

// @route   /api/veterans/register
// @desc    Add a Veteran Item
// @access  Public
router.post("/register", upload.single("image"), (req, res) => {
  const { isValid, errors } = validator.validateRegisterInput(req.body);
  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  Veteran.findOne({ email: req.body.email }).then((veteran) => {
    if (veteran) {
      return res.status(400).json({ email: "Email already exists" });
    } else {
      let newData = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        profession: req.body.profession,
        address: req.body.address,
        dob: req.body.dob,
      };
      if (req.file) {
        newData.image = req.file.filename;
      }
      const newVeteran = new Veteran(newData);

      // Hash password before saving in database
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newVeteran.password, salt, (err, hash) => {
          if (err) throw err;
          newVeteran.password = hash;
          newVeteran
            .save()
            .then((veteran) => res.json(veteran))
            .catch((err) => console.log(err));
        });
      });
    }
  });
});

// @route   /api/veterans/register
// @desc    Login a Veteran
// @access  Public
router.post("/login", (req, res) => {
  // Form validation
  const { errors, isValid } = validator.validateLoginInput(req.body);
  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  const email = req.body.email;
  const password = req.body.password;
  // Find veteran by email
  Veteran.findOne({ email }).then((veteran) => {
    // Check if veteran exists
    if (!veteran) {
      return res.status(404).json({ message: "Email not found" });
    }
    // Check password
    bcrypt.compare(password, veteran.password).then((isMatch) => {
      if (isMatch) {
        // Veteran matched
        // Create JWT Payload
        const payload = {
          id: veteran.id,
          name: veteran.name,
        };
        // Sign token
        jwt.sign(
          payload,
          keys.secretOrKey,
          {
            expiresIn: 31556926, // 1 year in seconds
          },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token,
              veteran,
            });
          }
        );
      } else {
        return res.status(400).json({ message: "Password incorrect" });
      }
    });
  });
});

module.exports = router;
