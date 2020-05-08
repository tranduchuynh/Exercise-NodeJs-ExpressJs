const express = require("express");
const router = express.Router();

const controllers = require("../controllers/auth.controller");
// const validates = require("../validates/user.validate");

router.get("/login", controllers.login);

router.post("/login", controllers.postLogin);


module.exports = router;