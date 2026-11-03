const express = require("express");
const router = express.Router();
const multer = require("multer");
const {
  add,
  get,
  getSingle,
  destroy,
  getAll,
  update,
  getByServiceId,
  getGroupService,
} = require("../controllers/galleryController");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/gallery");
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

// multiple images
const upload = multer({ storage: storage }).array("image");

router.post("/add", upload, add);
router.get("/", getAll);
router.get("/:id", getSingle);
router.get("/byservice/:id", getByServiceId);
router.patch("/update/:id", upload, update);
router.delete("/delete/:id", destroy);

module.exports = router;
