const express = require("express");
const router = express.Router();

const controllers = require("../controllers/users.controller");
const validates = require("../validates/user.validate");

// router.get("/cookie", (req, res) => {
//   res.cookie("user-id", "12345");
//   res.send("Hello cookie");
// });

router.get("/", controllers.index);

router.get("/search", controllers.search);

router.get("/create", (req, res) => {
  res.render("users/create");
});

router.post("/create", validates.postCreate, controllers.postCreate);

router.get("/:id", controllers.getId);

router.get("/edit/:id", controllers.edit);

router.get("/delete/:id", controllers.delete);

router.post("/edit/:id", controllers.postEdit);

module.exports = router;
