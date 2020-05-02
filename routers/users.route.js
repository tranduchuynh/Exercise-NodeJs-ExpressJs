const express = require("express");
const router = express.Router();

const shortid = require("shortid");
const db = require("../db");

router.get("/", (req, res) => {
  res.render("books/index", {
    books: db.get("books").value()
  });
});

router.get("/search", (req, res) => {
  const q = req.query.q;
  const bookName = db
    .get("books")
    .value()
    .filter(book => {
      return book.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
    });
  res.render("books/index", {
    books: bookName
  });
});

router.get("/create", (req, res) => {
  res.render("books/create");
});

router.post("/create", (req, res) => {
  req.body.id = shortid.generate();
  db.get("books")
    .push(req.body)
    .write();
  res.redirect("/users");
});

router.get("/:id", (req, res) => {
  const id = req.params.id;
  const name = db
    .get("books")
    .find({ id })
    .value();
  res.render("books/view", {
    name
  });
});

router.get("/edit/:id", (req, res) => {
  const id = req.params.id;
  const book = db
    .get("books")
    .find({ id })
    .value();
  res.render("books/edit", {
    book
  });
});

router.get("/delete/:id", (req, res) => {
  const id = req.params.id;
  const book = db
    .get("books")
    .find({ id })
    .value();
  if (book) {
    db.get("books")
      .remove({ name: book.name })
      .write();
    res.render("books/index", {
      books: db.get("books").value()
    });
  }
});

router.post("/edit/:id", (req, res) => {
  const id = req.params.id;
  const book = db
    .get("books")
    .find({ id })
    .assign({
      name: req.body.name,
      description: req.body.description
    })
    .write();
  console.log("books", book);
  res.redirect("/users");
});

module.exports = router;
