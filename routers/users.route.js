const express = require("express");
const multer = require("multer");
const router = express.Router();


const controllers = require("../controllers/users.controller");
const validates = require("../validates/user.validate");

const upload = multer({ dest: './public/profile/avatar/' });


// router.get("/cookie", (req, res) => {
//   res.cookie("user-id", "12345");
//   res.send("Hello cookie");
// });

router.get("/", controllers.index);

router.get("/search", upload.single('avatar'), controllers.search);

router.get("/create", (req, res) => {
  res.render("users/create");
});

router.post("/create", upload.single('avatar'), validates.postCreate, controllers.postCreate);

router.get("/update/avatar/:id", controllers.avatar);

router.post("/update/avatar/:id", upload.single('avatar'), controllers.postAvatar);

router.get("/:id", controllers.getId);

router.get("/edit/:id", controllers.edit);

router.get("/delete/:id", controllers.delete);

router.post("/edit/:id", controllers.postEdit);

module.exports = router;
