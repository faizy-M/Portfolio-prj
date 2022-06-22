const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const VeteranFollowerSchema = new Schema({
  veteran: {
    type: Schema.Types.ObjectId,
    ref: "Veteran",
  },
  follower: {
    type: Schema.Types.ObjectId,
    ref: "Veteran",
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

const VeteranEventSchema = new Schema({
  veteran: {
    type: Schema.Types.ObjectId,
    ref: "Veteran",
  },
  event: {
    type: Schema.Types.ObjectId,
    ref: "CommunityEvent",
  },
});

const VeteranPostSchema = new Schema({
  veteran: {
    type: Schema.Types.ObjectId,
    ref: "Veteran",
  },
  post: {
    type: Schema.Types.ObjectId,
    ref: "Post",
  },
});

const VeteranSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  profession: {
    type: String,
    required: true,
  },
  address: {
    type: new Schema({
      latitude: Number,
      longitude: Number,
    }),
  },
  hobbies: [
    {
      type: String,
    },
  ],
  created_organizations: [
    {
      type: Schema.Types.ObjectId,
      ref: "Organization",
    },
  ],
  stars: {
    type: Number,
    default: 0,
  },
  image: {
    type: String,
    default:
      "https://res.cloudinary.com/dzqbzqgjw/image/upload/v1598424851/default_profile_image_zqjqjy.png",
  },
  dob: {
    type: Date,
    required: true,
  },
});

module.exports = {
  VeteranEvent: mongoose.model("VeteranEvent", VeteranEventSchema),
  VeteranPost: mongoose.model("VeteranPost", VeteranPostSchema),
  VeteranFollower: mongoose.model("VeteranFollower", VeteranFollowerSchema),
  Veteran: mongoose.model("Veteran", VeteranSchema),
};
