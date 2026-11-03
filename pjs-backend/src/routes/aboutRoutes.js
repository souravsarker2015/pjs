const express = require("express");
const router = express.Router();
const multer = require("multer");
const {
  getAboutUs,
  updateAboutUs,
  createAboutUs,
} = require("../controllers/aboutControllers");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/aboutus");
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage: storage });

router.get("/", getAboutUs);
router.post(
  "/add",
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "profileDoc", maxCount: 1 },
  ]),
  createAboutUs
);
router.patch(
  "/update/:id",
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "profileDoc", maxCount: 1 },
  ]),
  updateAboutUs
);

module.exports = router;
