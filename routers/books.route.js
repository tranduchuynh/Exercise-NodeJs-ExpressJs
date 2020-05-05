const express = require("express");
const router = express.Router();

const controllers = require("../controllers/books.controller");

router.get("/", controllers.index);
router.get("/search", controllers.search);
router.get("/create", controllers.create);
router.post("/create", controllers.postCreate);
router.get("/:id", controllers.view);
router.get("/:id/edit", controllers.edit);
router.post("/:id/edit", controllers.postEdit);
router.get("/:id/delete", controllers.delete);


module.exports = router;