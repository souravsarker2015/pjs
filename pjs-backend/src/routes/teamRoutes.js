const router = require("express").Router();
const verifyAdmin = require("../middleware/verifyAdmin");
const multer = require("multer");
const {
  add,
  getSingle,
  update,
  destroy,
  getAll,
} = require("../controllers/teamController");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/team");
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage: storage }).single("image");

router.post("/add", verifyAdmin, upload, add);
router.get("/all", getAll);
router.get("/:id", getSingle);
router.patch("/update/:id", verifyAdmin, upload, update);
router.delete("/delete/:id", verifyAdmin, destroy);

module.exports = router;
