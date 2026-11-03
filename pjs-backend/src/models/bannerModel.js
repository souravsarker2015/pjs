const mongoose = require("mongoose");

const BannerSchema = new mongoose.Schema(
  {
    bg: {
      type: String,
      required: true,
    },
  },
  { timestamps: false }
);

const Banner = mongoose.model("Banner", BannerSchema);

module.exports = Banner;
