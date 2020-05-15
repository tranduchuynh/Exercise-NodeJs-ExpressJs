const shortid = require("shortid");
const Book = require("../models/books");

const db = require("../db");

module.exports.index = async (req, res) => {
  // const books = db.get("books").value();

  const books = await Book.find({});
  const page = req.query.page || 1; // n
  const perPage = 10; // x

  const start = (page - 1) * perPage;
  const end = page * perPage;

  const total = Math.ceil(books.length / perPage);
  const totalBooks = books.slice(0, total);

  res.render("books/index", {
    books: books.slice(start, end),
    totalBooks,
    perPage,
    page
  });
};

module.exports.search = async (req, res) => {
  const q = req.query.q;
  // const books = db.get("books").value().filter(book => {
  //   return book.title.toLowerCase().indexOf(q.toLowerCase()) !== -1;
  // })
  const books = await Book.find({});
  const book = books.filter(book => {
    return book.title.toLowerCase().indexOf(q.toLowerCase()) !== -1;
  });
  const page = req.query.page || 1; // n
  const perPage = 10; // x

  const start = (page - 1) * perPage;
  const end = page * perPage;

  const total = Math.ceil(books.length / perPage);
  const totalBooks = books.slice(0, total);

  res.render("books/index", {
    books: book.slice(start, end),
    totalBooks,
    perPage,
    page
  });
};

module.exports.create = async (req, res) => {
  const books = await Book.find({});
  res.render("books/create", {
    books
  });
};

module.exports.postCreate = async (req, res) => {
  req.body.id = shortid.generate();

  if (!req.file) {
    req.body.coverUrl =
      "https://cdn.glitch.com/4ab1e734-3748-4dc8-bdb9-eb00249751c5%2Fdefault.jpeg?v=1589210447754";
  } else {
    req.body.coverUrl = req.file.path
      .split("/")
      .slice(1)
      .join("/");
  }

  // db.get("books").push(req.body).write();
  const books = new Book(req.body);
  await books.save();

  res.redirect("/books");
};

module.exports.view = async (req, res) => {
  const _id = req.params.id;
  // const book = db.get("books").find({ id }).value();
  const book = await Book.findById({ _id });
  res.render("books/view", {
    book
  });
};

module.exports.edit = async (req, res) => {
  const _id = req.params.id;
  // const book = db.get("books").find({ id }).value();
  const book = await Book.findById({ _id });
  res.render("books/edit", {
    book
  });
};

module.exports.postEdit = async (req, res) => {
  const _id = req.params.id;
  const title = req.body.title;
  const description = req.body.description;
  if (!req.file) {
    // db.get("books").find({ id }).assign({ ttle, description }).write();
    const book = await Book.findByIdAndUpdate(_id, req.body, { new: true });
    res.redirect("/books");
    return;
  }

  const coverUrl = req.file.path
    .split("/")
    .slice(1)
    .join("/");
  // db.get("books").find({ id }).assign({ title, description, coverUrl }).write();
  console.log(req.body);
  const books = await Book.findByIdAndUpdate(
    _id,
    { title, description, coverUrl },
    {
      new: true
    }
  );
  res.redirect("/books");
};

module.exports.delete = async (req, res) => {
  const _id = req.params.id;

  // const book = db.get("books").find({ id }).value();
  // const books = db.get("books").value();

  const book = await Book.findByIdAndDelete(_id);
  const books = await Book.find({});

  const page = req.query.page || 1; // n
  const perPage = 10; // x

  const start = (page - 1) * perPage;
  const end = page * perPage;

  const total = Math.ceil(books.length / perPage);
  const totalBooks = books.slice(0, total);

  if (book) {
    // db.get("books")
    //   .remove({ id: book.id })
    //   .write();
    res.render("books/index", {
      books: books.slice(start, end),
      totalBooks,
      perPage,
      page
    });
  }
};
