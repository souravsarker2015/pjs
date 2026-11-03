const router = require("express").Router();
const {
  getAll,
  getSingle,
  add,
  update,
  destroy,
} = require("../controllers/faqController");

router.get("/all", getAll);
router.get("/:id", getSingle);
router.post("/add", add);
router.patch("/update/:id", update);
router.delete("/delete/:id", destroy);

module.exports = router;
