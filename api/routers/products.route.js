const express = require("express");
const router = express.Router();

const controllers = require("../controllers/products.controller");
// const validates = require("../validates/user.validate");

router.get("/", controllers.index);

router.post("/", controllers.create);


module.exports = router;