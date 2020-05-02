const express = require("express");
const router = express.Router();
const controllers = require("../controllers/trans.controller");

router.get("/", controllers.index);

router.get("/create", controllers.create);

router.post("/create/:id", controllers.postCreate);

module.exports = router;
