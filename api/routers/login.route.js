const express = require("express");
const router = express.Router();

const controllers = require("../controllers/login.controller");
// const validates = require("../validates/user.validate");

// router.get("/login", controllers.login);

router.post("/", controllers.postLogin);


module.exports = router;