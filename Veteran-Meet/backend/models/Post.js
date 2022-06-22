const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  media: {
    type: String,
    required: true,
  },
  created_by: {
    type: Schema.Types.ObjectId,
    ref: "Veteran",
  },
});

module.exports = Post = mongoose.model("Post", PostSchema);
