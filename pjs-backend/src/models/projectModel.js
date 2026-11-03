const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  image: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  bed: {
    type: String,
    required: true,
  },
  bath: {
    type: String,
    required: true,
  },
  sqft: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  gallery: [
    {
      type: String, 
      required: true,
    },
  ],
  description: {
    type: String,
    required: true,
  },
});

const Project = mongoose.model("Project", projectSchema);

module.exports = Project;
