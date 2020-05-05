const shortid = require("shortid");
const db = require("../db");

module.exports.index = (req, res) => {
  res.render("books/index", {
    books: db.get("books").value()
  });
};

module.exports.search = (req, res) => {
  const q = req.query.q;
  const books = db.get("books").value().filter(book => {
    return book.title.toLowerCase().indexOf(q.toLowerCase()) !== -1;
  })
  
  res.render("books/index", {
    books
  })
}


module.exports.create = (req, res) => {
  res.render("books/create", {
    books: db.get("books").value()
  })
}


module.exports.postCreate = (req, res) => {
  req.body.id = shortid.generate();;
  db.get("books").push(req.body).write();
  res.redirect("/books");
}

module.exports.view = (req, res) => {
  const id = req.params.id;
  const book = db.get("books").find({ id }).value();
  res.render("books/view", {
    book
  })
}

module.exports.edit = (req, res) => {
  const id = req.params.id;
  const book = db.get("books").find({ id }).value();
  res.render("books/edit", {
    book
  })
}

module.exports.postEdit = (req, res) => {
  const id = req.params.id;
  const title = req.body.title;
  const description = req.body.description;
  db.get("books").find({ id }).assign({title, description}).write();
  res.redirect("/books")
}

module.exports.delete = (req, res) => {
  const id = req.params.id;
  const book = db.get("books").find({ id }).value();
  if(book) {
    db.get("books").remove({ id: book.id }).write();
    res.render("books/index", {
      books: db.get("books").value()
    });
  }
}