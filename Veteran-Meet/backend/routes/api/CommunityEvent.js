const express = require("express");
const router = express.Router();
const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
const path = require("path");

const Organization = require("../../models/Organization");
const CommunityEvent = require("../../models/CommunityEvent");
const VeteranEvent = require("../../models/Veteran").VeteranEvent;
const OrganizationEvent =
  require("../../models/Organization").OrganizationEvent;
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

// add a community event
// @route   /api/community-events
// @desc    Add a community event
// @access  Public
router.post("/", (req, res) => {
  let data = {
    title: req.body.title,
    description: req.body.description,
    meet_link: req.body.meet_link,
    event_time: req.body.event_time,
    type: req.body.type,
    event_stars: req.body.event_stars,
  };
  const newCommunityEvent = new CommunityEvent(data);
  newCommunityEvent.save();
  // associate the community event with the organization or the veteran
  if (req.body.organization) {
    OrganizationEvent.create({
      organization: req.body.organization,
      community_event: newCommunityEvent._id,
    });
  } else {
    VeteranEvent.create({
      veteran: req.body.veteran,
      community_event: newCommunityEvent._id,
    });
  }
  return res.json(newCommunityEvent);
});

// edit a community event except for the event_stars
// @route   /api/community-events/:id
// @desc    Edit a community event
// @access  Public
router.put("/:id", (req, res) => {
  CommunityEvent.findById(req.params.id)

    .then((communityEvent) => {
      communityEvent.title = req.body.title;
      communityEvent.description = req.body.description;
      communityEvent.meet_link = req.body.meet_link;
      communityEvent.event_time = req.body.event_time;
      communityEvent.type = req.body.type;
      communityEvent.save();
      return res.json(communityEvent);
    })
    .catch((err) => {
      return res.json(err);
    });
});

// delete a community event
// @route   /api/community-events/:id
// @desc    Delete a community event
// @access  Public
router.delete("/:id", (req, res) => {
  CommunityEvent.findById(req.params.id)
    .then((communityEvent) => {
      communityEvent.remove().then(() => res.json({ success: true }));
    })
    .catch((err) => res.status(404).json({ success: false }));
});

// get recents events of organizations followed by the veteran
// @route   /api/community-events/recent
// @desc    Get recents events of organizations followed by the veteran
// @access  Public
router.get("/recents", (req, res) => {
  CommunityEvent.find({})
    .sort({ event_time: -1 })
    .limit(10)
    .then((communityEvents) => {
      return res.json(communityEvents);
    })
    .catch((err) => {
      return res.json(err);
    });
});

module.exports = router;
