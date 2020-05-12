const express = require("express");
const multer = require("multer");
const router = express.Router();

const controllers = require("../controllers/books.controller");

const upload = multer({ dest: './public/coverBooks/' });

router.get("/", controllers.index);
router.get("/search", controllers.search);
router.get("/create", controllers.create);
router.post("/create", upload.single('cover'), controllers.postCreate);
router.get("/:id", controllers.view);
router.get("/:id/edit", controllers.edit);
router.post("/:id/edit", upload.single('cover'), controllers.postEdit);
router.get("/:id/delete", controllers.delete);

module.exports = router;
