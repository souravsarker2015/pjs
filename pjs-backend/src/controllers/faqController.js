const Model = require("../models/faqModel");

exports.add = async (req, res) => {
  const data = req?.body;

  try {
    const result = await Model.create(data);

    if (!result)
      return res.json({
        success: false,
        message: "FAQ not added",
      });

    res.status(200).json({
      success: true,
      message: "FAQ added successfully",
      data: result,
    });
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

  try {
    const isExist = await Model.findById(id);

    if (!isExist) {
      return res.json({
        success: false,
        message: "FAQ not found",
      });
    }

    const result = await Model.findByIdAndUpdate(id, data, { new: true });

    res.status(200).json({
      success: true,
      message: "WhyChoose updated successfully",
      data: result,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

exports.getAll = async (req, res) => {
  try {
    const FAQ = await Model.find({});

    if (!FAQ) {
      return res.json({
        success: false,
        message: "FAQ's not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "FAQ's found successfully",
      data: FAQ,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error?.message,
    });
  }
};

exports.getSingle = async (req, res) => {
  const id = req?.params?.id;

  try {
    const FAQ = await Model.findById(id);

    if (!FAQ)
      return res.json({
        success: false,
        message: "FAQ not found",
      });

    res.status(200).json({
      success: true,
      message: "FAQ found successfully",
      data: FAQ,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error?.message,
    });
  }
};

exports.destroy = async (req, res) => {
  const id = req?.params?.id;

  try {
    const FAQ = await Model.findById(id);

    if (!FAQ) {
      return res.json({
        success: false,
        message: "FAQ not found",
      });
    }

    await Model.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "FAQ deleted successfully",
    });
  } catch (error) {
    res.json({
      success: false,
      message: error?.message,
    });
  }
};
