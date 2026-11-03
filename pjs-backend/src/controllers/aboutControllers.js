const fs = require("fs");
const AboutUs = require("../models/aboutModel");

exports.createAboutUs = async (req, res) => {
  const image = req.files["image"] ? req.files["image"][0]?.filename : null;
  const profileDoc = req.files["profileDoc"]?.filename
    ? req.files["profileDoc"][0]
    : null;

  let aboutUs = {
    ...req?.body,
    image: `/aboutus/${image}`,
  };

  if (profileDoc) {
    aboutUs = {
      ...aboutUs,
      profileDoc: `/aboutus/${profileDoc}`,
    };
  }

  try {
    const isExist = await AboutUs.findOne();
    if (isExist) {
      fs.unlink(`./uploads/aboutus/${image}`, (err) => {
        if (err) {
          console.log(err);
        }
      });

      return res.json({
        success: false,
        message: "About Us already exists",
      });
    }

    const result = await AboutUs.create(aboutUs);

    res.status(201).json({
      success: true,
      message: "About Us created successfully",
      data: result,
    });
  } catch (err) {
    res.json({
      success: false,
      message: err.message,
    });

    if (image) {
      fs.unlink(`./uploads/aboutus/${image}`, (err) => {
        if (err) {
          console.log(err);
        }
      });
    }

    if (profileDoc) {
      fs.unlink(`./uploads/aboutus/${profileDoc}`, (err) => {
        if (err) {
          console.log(err);
        }
      });
    }
  }
};

exports.getAboutUs = async (req, res) => {
  try {
    const result = await AboutUs.findOne();

    res.status(200).json({
      success: true,
      message: "About Us fetched successfully",
      data: result,
    });
  } catch (err) {
    res.json({
      success: false,
      message: err.message,
    });
  }
};

exports.updateAboutUs = async (req, res) => {
  const id = req?.params?.id;
  const data = req?.body;
  const image = req.files["image"] ? req.files["image"][0]?.filename : null;
  const profileDoc = req.files["profileDoc"]
    ? req.files["profileDoc"][0]?.filename
    : null;

  try {
    const isExist = await AboutUs.findById(id);

    if (!isExist) {
      return res.json({
        success: false,
        message: "About Us not found",
      });
    }

    let newData = {
      ...data,
      image: image ? `/aboutus/${image}` : isExist?.image,
      profileDoc: profileDoc ? `/aboutus/${profileDoc}` : isExist?.profileDoc,
    };

    const result = await AboutUs.findByIdAndUpdate(id, newData, {
      new: true,
    });

    if (!result) {
      return res.json({
        success: false,
        message: "About Us not updated",
      });
    }

    res.status(200).json({
      success: true,
      message: "About Us updated successfully",
      data: result,
    });

    if (image && isExist?.image) {
      fs.unlink(`./uploads/${isExist?.image}`, (err) => {
        if (err) {
          console.log(err);
        }
      });
    }

    if (profileDoc && isExist?.profileDoc) {
      fs.unlink(`./uploads/${isExist?.profileDoc}`, (err) => {
        if (err) {
          console.log(err);
        }
      });
    }
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });

    if (image) {
      fs.unlink(`./uploads/aboutus/${image}`, (err) => {
        if (err) {
          console.log(err);
        }
      });
    }

    if (profileDoc) {
      fs.unlink(`./uploads/aboutus/${profileDoc}`, (err) => {
        if (err) {
          console.log(err);
        }
      });
    }
  }
};
