const Project = require("../models/projectModel");
const fs = require("fs");

exports.addProject = async (req, res) => {
  try {
    const { title, price, bed, bath, sqft, location, description } = req.body;

    const image = req?.files?.mainImage?.[0]?.filename;
    const gallery = req?.files?.galleryImages?.map((file) => file.filename);

    if (!image || !gallery) {
      return res.json({
        success: false,
        message: "Main image and gallery images are required",
      });
    }

    const newProject = new Project({
      title,
      price,
      bed,
      bath,
      sqft,
      location,
      description,
      image: `/projects/${image}`,
      gallery: gallery.map((img) => `/projects/${img}`),
    });

    const savedProject = await newProject.save();
    res.status(201).json({
      success: true,
      data: savedProject,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

exports.getProjects = async (req, res) => {
  try {
    const projects = await Project.find({});
    res.status(200).json({
      success: true,
      message: "Projects fetched successfully",
      data: projects,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

exports.getRecentProjects = async (req, res) => {
  try {
    const projects = await Project.find({}).sort({ createdAt: -1 }).limit(5);
    res.status(200).json({
      success: true,
      message: "Projects fetched successfully",
      data: projects,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

exports.getProjectById = async (req, res) => {
  const { id } = req.params;
  try {
    const project = await Project.findById(id);
    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Project fetched successfully",
      data: project,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

exports.updateProject = async (req, res) => {
  const { id } = req.params;
  try {
    const { title, price, bed, bath, sqft, location, description } = req.body;

    const image = req?.files?.mainImage?.[0]?.filename;
    const gallery = req?.files?.galleryImages?.map((file) => file.filename);

    const project = await Project.findById(id);
    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    if (image) {
      fs.unlink(`./uploads${project.image}`, (err) => {
        if (err) console.error(err);
      });
      project.image = `/projects/${image}`;
    }

    if (gallery && gallery.length > 0) {
      project.gallery.forEach((img) => {
        fs.unlink(`./uploads${img}`, (err) => {
          if (err) console.error(err);
        });
      });
      project.gallery = gallery.map((img) => `/projects/${img}`);
    }

    project.title = title || project.title;
    project.price = price || project.price;
    project.bed = bed || project.bed;
    project.bath = bath || project.bath;
    project.sqft = sqft || project.sqft;
    project.location = location || project.location;
    project.description = description || project.description;

    await project.save();

    res.status(200).json({
      success: true,
      message: "Project updated successfully",
      data: project,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

exports.deleteProject = async (req, res) => {
  const { id } = req.params;
  try {
    const project = await Project.findById(id);
    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    fs.unlink(`./uploads${project.image}`, (err) => {
      if (err) console.error(err);
    });

    project.gallery.forEach((img) => {
      fs.unlink(`./uploads${img}`, (err) => {
        if (err) console.error(err);
      });
    });

    await Project.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Project deleted successfully",
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};
