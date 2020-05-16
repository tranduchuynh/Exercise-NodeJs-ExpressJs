const express = require("express");
const router = express.Router();

const controllers = require("../controllers/users.controller");
// const validates = require("../validates/user.validate");

router.get("/", controllers.index);
router.get("/:id", controllers.view);
router.patch("/:id", controllers.update);
router.delete("/:id", controllers.delete);


module.exports = router;