const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OrganizationFollower = new Schema({
  organization: {
    type: Schema.Types.ObjectId,
    ref: "Organization",
  },
  follower: {
    type: Schema.Types.ObjectId,
    ref: "Veteran",
  },
});

const OrganizationEvent = new Schema({
  organization: {
    type: Schema.Types.ObjectId,
    ref: "Organization",
  },
  event: {
    type: Schema.Types.ObjectId,
    ref: "CommunityEvent",
  },
});

const OrganizationSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  about: {
    type: String,
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  image: {
    type: String,
    required: true,
  },
});

module.exports = {
  Organization: mongoose.model("Organization", OrganizationSchema),
  OrganizationEvent: mongoose.model("OrganizationEvent", OrganizationEvent),
  OrganizationFollower: mongoose.model(
    "OrganizationFollower",
    OrganizationFollower
  ),
};
