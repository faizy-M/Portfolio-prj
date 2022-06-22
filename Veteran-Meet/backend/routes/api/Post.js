const express = require("express");
const router = express.Router();
const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
const path = require("path");

const Post = require("../../models/Post");
const { VeteranPost } = require("../../models/Veteran");
const vet = require("../../models/Veteran").Veteran;
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
// @desc    Add a Post Item
// @access  Public
router.post("/", upload.single("media"), (req, res) => {
  let data = {
    created_by: req.body.veteran,
    title: req.body.title,
  };
  if (req.file) {
    data.media = req.file.filename;
    data.type = "multimedia";
  }
  if (req.body.content) {
    data.content = req.body.content;
    if (data.type !== "multimedia") {
      data.type = "text";
    } else {
      data.type = "both";
    }
  }
  let newPost = new Post(data);
  newPost.save();
  // add the post to the veteran
  VeteranPost.create({
    post: newPost._id,
    veteran: req.body.posted_at,
  });
  return res.json(newPost);
});

// delete a post
router.delete("/:id", (req, res) => {
  Post.findById(req.params.id)

    .then((post) => {
      post.remove().then(() => res.json({ success: true }));
    })
    .catch((err) => res.status(404).json({ success: false }));
});

// edit a post
router.put("/:id", (req, res) => {
  Post.findById(req.params.id)
    .then((post) => {
      post.title = req.body.title;
      post.content = req.body.content;
      post.created_by = req.body.created_by;
      post.type = req.body.type;
      post.media = req.body.media;
      post.created_at = req.body.created_at;
      post.save().then(() => res.json({ success: true }));
    })
    .catch((err) => res.status(404).json({ success: false }));
});

// fetch veteran posts
router.get("/veteran/:id", (req, res) => {
  console.log(req.params.id);
  VeteranPost.find({ veteran: req.params.id })
    .populate("veteran")
    .populate({
      path: "post",
      populate: {
        path: "created_by",
        model: "Veteran",
      },
    })
    .then((posts) => {
      return res.json(posts);
    })
    .catch((err) => {
      console.log(err);
      res.status(404).json({ success: false });
    });
});

module.exports = router;
