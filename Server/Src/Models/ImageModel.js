const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema({
  url: {
    type: String,
  },
  title: {
    type: String,
  },
  email: {
    type: String,
  },
  description: {
    type: String,
  },
  views: {
    type: Number,
    default: 0,
  },
});
const Image = mongoose.model("Image", imageSchema);

module.exports = Image;
