const express = require("express");
const router = express.Router();
const controllers = require("../controllers/trans.controller");

router.get("/", controllers.index);

router.get("/create", controllers.create);

router.post("/create", controllers.postCreate);

router.get("/complete/:id", controllers.complete);

router.get("/delete/:id", controllers.delete);

router.get("/search", controllers.search);

module.exports = router;
