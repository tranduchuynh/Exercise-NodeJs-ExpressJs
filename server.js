const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const shortid = require("shortid");

app.use(express.static("public"));

app.set("view engine", "/views");
app.set("view engine", "pug");

const adapter = new FileSync("db.json");
const db = low(adapter);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

db.defaults({ books: [] }).write();

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/books", (req, res) => {
  res.render("books/index", {
    books: db.get("books").value()
  });
});

app.get("/books/create", (req, res) => {
  res.render("books/create");
});

app.post("/books/create", (req, res) => {
  req.body.id = shortid.generate();
  db.get("books")
    .push(req.body)
    .write();
  res.redirect("/books");
});

app.get("/books/:id", (req, res) => {
  const id = req.params.id;
  const name = db
    .get("books")
    .find({ id })
    .value();
  res.render("books/view", {
    name
  });
});

app.get("/books/edit/:id", (req, res) => {
  const id = req.params.id;
  const book = db.get("books").find({ id }).value();
  res.render("books/edit", {
    book
  });
});

app.get("/books/delete/:id", (req, res) => {
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

app.post("/books/edit/:id", (req, res) => {
  const id = req.params.id;
  const book = db
    .get("books")
    .find({ id })
    .assign({
      name: req.body.name,
      description: req.body.description
    })
    .write();
    console.log('books', book)
    res.redirect("/books");
});

// listen for requests :)
const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
