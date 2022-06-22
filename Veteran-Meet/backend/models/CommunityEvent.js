const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CommunityEventSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  description: {
    type: String,
    required: true,
  },
  meet_link: {
    type: String,
    required: true,
  },
  event_time: {
    type: Date,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  event_stars: {
    type: Number,
    required: true,
  },
});

module.exports = CommunityEvent = mongoose.model(
  "CommunityEvent",
  CommunityEventSchema
);
