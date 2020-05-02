const express = require("express");
const router = express.Router();

const shortid = require("shortid");
const db = require("../db");

router.get("/", (req, res) => {
  res.render("trans/index", {
    trans: db.get("trans").value()
  });
})


router.get("/create", (req, res) => {
  res.render("trans/create", {
    users: db.get("users").value()
  })
})

router.post("/create/:id", (req, res) => {
  const userId = db.get("users").find({ id: req.params.id }).value();
  req.body.id = shortid.generate();
  req.body.userId = userId.id
  req.body.bookId = shortid.generate();
  const trans = db.get("trans").push(req.body).write();
  res.redirect("/trans")
})

router.get("/delete/:id", (req, res) => {
  const id = req.params.id;
  const trans = db.get("trans").find({ id }).value();
  if(trans) {
    db.get("trans").remove({ id: trans.id }).write();
    res.render("trans/index", {
      trans: db.get("trans").value()
    })
  }
})

module.exports = router;
