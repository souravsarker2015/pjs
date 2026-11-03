const fs = require("fs");
const Whychoose = require("../models/whychooseModel");

exports.add = async (req, res) => {
  const image = req?.file?.filename;
  const { title } = req?.body;
  console.log(req?.file);
  console.log(title);

  try {

    const data = {
      image,
      title,
    }

    let result = await Whychoose.create(data);

    res.status(201).json({
      success: true,
      message: "Whychoose created successfully",
      data: result,
    });
  } catch (err) {
    res.json({
      success: false,
      message: err.message,
    });

    if (image) {
      fs.unlink(`./uploads/whychoose/${image}`, (err) => {
        if (err) {
          console.error(err);
        }
      });
    }
  }
};

exports.get = async (req, res) => {
  try {
    const result = await Whychoose.find({});

    if (!result) {
      return res.status(404).json({
        success: false,
        message: "Whychoose not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Whychoose fetched successfully",
      data: result,
    });
  } catch (err) {
    res.json({
      success: false,
      message: err.message,
    });
  }
};

exports.getSingle = async (req, res) => {
  try {
    let { id } = req.params;
    const result = await Whychoose.findById(id);

    if (!result) {
      return res.status(404).json({
        success: false,
        message: "Whychoose not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Whychoose fetched successfully",
      data: result,
    });
  } catch (err) {
    res.json({
      success: false,
      message: err.message,
    });
  }
};

exports.update = async (req, res) => {
  const id = req.params.id;
  const newImage = req?.file?.filename;
  const { title } = req.body;

  try {
    // Find existing document
    const existing = await Whychoose.findById(id);
    if (!existing) {
      // If new image uploaded, delete it since no doc to update
      if (newImage) {
        fs.unlink(`./uploads/whychoose/${newImage}`, (err) => {
          if (err) console.error(err);
        });
      }

      return res.status(404).json({
        success: false,
        message: "Whychoose not found",
      });
    }

    // Prepare updated data
    let updatedData = { title };

    // If a new image is uploaded, delete old image file and update with new one
    if (newImage) {
      if (existing.image) {
        fs.unlink(`./uploads/whychoose/${existing.image}`, (err) => {
          if (err) console.error(err);
        });
      }
      updatedData.image = newImage;
    }

    // Update document
    const updatedDoc = await Whychoose.findByIdAndUpdate(id, updatedData, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      message: "Whychoose updated successfully",
      data: updatedDoc,
    });
  } catch (err) {
    // Delete newly uploaded image in case of error
    if (newImage) {
      fs.unlink(`./uploads/whychoose/${newImage}`, (unlinkErr) => {
        if (unlinkErr) console.error(unlinkErr);
      });
    }

    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};


exports.destroy = async (req, res) => {
  const id = req?.params?.id;

  try {
    const isExist = await Whychoose.findById(id);

    if (!isExist) {
      return res.status(404).json({
        success: false,
        message: "Whychoose not found",
      });
    }

    const result = await Whychoose.findByIdAndDelete(id);
    if (result?._id) {
      fs.unlink(`./uploads/whychoose/${isExist?.image}`, (err) => {
        if (err) {
          console.error(err);
        }
      });
    }

    res.status(200).json({
      success: true,
      message: "Whychoose delete successfully",
      data: result,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};
