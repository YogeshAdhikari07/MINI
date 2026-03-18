const mongoose = require("mongoose");

const fileSchema = new mongoose.Schema({
  filename: {
    type: String,
    required: true,
  },
  subjectID:
  {
    type:String,
    required:true
  },
  originalname: {
    type: String,
    required: true,
  },
  path: {
    type: String,
    required: true,
  },
  mimetype: String,
  size: Number,
});

module.exports = mongoose.model("File", fileSchema);