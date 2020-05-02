const express = require("express");
const router = express.Router();

const shortid = require("shortid");
const db = require("../db");

router.get("/", (req, res) => {
  res.render("users/index", {
    users: db.get("users").value()
  });
});

router.get("/search", (req, res) => {
  const q = req.query.q;
  const bookName = db
    .get("users")
    .value()
    .filter(book => {
      return book.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
    });
  res.render("users/index", {
    users: bookName
  });
});

router.get("/create", (req, res) => {
  res.render("users/create");
});

router.post("/create", (req, res) => {
  req.body.id = shortid.generate();
  db.get("users")
    .push(req.body)
    .write();
  res.redirect("/users");
});

router.get("/:id", (req, res) => {
  const id = req.params.id;
  const name = db
    .get("users")
    .find({ id })
    .value();
  res.render("users/view", {
    name
  });
});

router.get("/edit/:id", (req, res) => {
  const id = req.params.id;
  const user = db
    .get("users")
    .find({ id })
    .value();
  res.render("users/edit", {
    user
  });
});

router.get("/delete/:id", (req, res) => {
  const id = req.params.id;
  const user = db
    .get("users")
    .find({ id })
    .value();
  if (user) {
    db.get("users")
      .remove({ id: user.id })
      .write();
    res.render("users/index", {
      users: db.get("users").value()
    });
  }
});

router.post("/edit/:id", (req, res) => {
  const id = req.params.id;
  const user = db
    .get("users")
    .find({ id })
    .assign({
      name: req.body.name,
      description: req.body.description
    })
    .write();
  res.redirect("/users");
});

module.exports = router;
