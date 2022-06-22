const express = require("express");
const router = express.Router();
const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
const path = require("path");

const Organization = require("../../models/Organization").Organization;
const OrganizationFollower =
  require("../../models/Organization").OrganizationFollower;
const Veteran = require("../../models/Veteran").Veteran;
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

// @route   /api/posts
// @desc    Add an organization to the veteran
// @access  Public
router.post("/", upload.single("image"), (req, res) => {
  let data = {
    name: req.body.name,
    about: req.body.about,
  };
  console.log(req.file);
  if (req.file) {
    data.image = req.file.filename;
  }
  let newOrganization = new Organization(data);
  newOrganization.save();
  // add the organization to the veteran
  Veteran.findById(req.body.veteran).then((veteran) => {
    console.log("Veterna", veteran);
    veteran.created_organizations.push(newOrganization);
    veteran.save();
  });

  return res.json(newOrganization);
});

// get VeteranOrganizations
router.get("/:veteran", (req, res) => {
  Veteran.findById(req.params.veteran)
    .populate("created_organizations")
    .then((veteran) => {
      return res.json(veteran.created_organizations);
    });
});

module.exports = router;
