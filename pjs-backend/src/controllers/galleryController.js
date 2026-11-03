const fs = require("fs");
const Gallery = require("../models/galleryModel");
const { default: mongoose } = require("mongoose");

exports.add = async (req, res) => {
  const data = req?.body;
  const images = req?.files;

  try {
    if (images?.length <= 0) {
      return res.json({
        success: false,
        message: "Image is required",
      });
    }

    const newData = {
      ...data,
      images: images.map((img) => `gallery/${img?.filename}`),
    };

    let result = await Gallery.create(newData);

    res.status(201).json({
      success: true,
      message: "Gallery created successfully",
      data: result,
    });
  } catch (err) {
    res.json({
      success: false,
      message: err.message,
    });

    images?.map((img) => {
      fs.unlink(`./uploads/gallery/${img?.filename}`, (err) => {
        if (err) {
          console.error(err);
        }
      });
    });
  }
};

exports.getAll = async (req, res) => {
  try {
    const result = await Gallery.find({}).populate("service");

    if (!result) {
      return res.json({
        success: false,
        message: "Gallery not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Gallery fetched successfully",
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
    const result = await Gallery.findById(id).populate("service");

    if (!result) {
      return res.json({
        success: false,
        message: "Gallery not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Gallery Fetch Successfully",
      data: result,
    });
  } catch (err) {
    res.json({
      success: false,
      message: err.message,
    });
  }
};

exports.destroy = async (req, res) => {
  const id = req?.params?.id;

  try {
    const isExist = await Gallery.findById(id);

    if (!isExist) {
      return res.json({
        success: false,
        message: "Gallery not found",
      });
    }

    const result = await Gallery.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Gallery delete successfully",
      data: result,
    });

    if (result?._id && result?.images?.length > 0) {
      result?.images?.map((img) => {
        fs.unlink(`./uploads/${img}`, (err) => {
          if (err) {
            console.error(err);
          }
        });
      });
    }
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

exports.update = async (req, res) => {
  const id = req?.params?.id;
  const data = req?.body;
  const images = req?.files;

  try {
    const isExist = await Gallery.findById(id);

    if (!isExist) {
      if (image) {
        fs.unlink(`./uploads/gallery/${image}`, (err) => {
          if (err) {
            console.error(err);
          }
        });
      }

      return res.json({
        success: false,
        message: "Gallery not found",
      });
    }

    let newData = {
      ...data,
      images:
        images?.length > 0
          ? images.map((img) => `gallery/${img?.filename}`)
          : isExist?.images,
    };

    const result = await Gallery.findByIdAndUpdate(id, newData, {
      new: true,
    });

    res.status(200).json({
      success: true,
      message: "Gallery updated successfully",
      data: result,
    });

    if (images?.length > 0) {
      isExist?.images?.map((img) => {
        fs.unlink(`./uploads/${img}`, (err) => {
          if (err) {
            console.error(err);
          }
        });
      });
    }
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });

    if (images?.length > 0) {
      images?.map((img) => {
        fs.unlink(`./uploads/gallery/${img?.filename}`, (err) => {
          if (err) {
            console.error(err);
          }
        });
      });
    }
  }
};

// get galley by service id
exports.getByServiceId = async (req, res) => {
  try {
    let { id } = req.params;
    const result = await Gallery.aggregate([
      {
        $match: {
          service: new mongoose.Types.ObjectId(id),
        },
      },
      {
        $unwind: "$images",
      },
      {
        $group: {
          _id: "$service",
          images: { $push: "$images" },
        },
      },
    ]);

    if (!result) {
      return res.json({
        success: false,
        message: "Gallery not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Gallery Fetch Successfully",
      data: result[0],
    });
  } catch (err) {
    res.json({
      success: false,
      message: err.message,
    });
  }
};
