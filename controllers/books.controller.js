const shortid = require("shortid");

const db = require("../db");

module.exports.index = (req, res) => {
  const books = db.get("books").value();
  
  const page = req.query.page || 1; // n
  const perPage = 10 // x
  
  const start = (page - 1) * perPage;
  const end = page * perPage
  
  const total = Math.ceil(books.length / perPage);
  const totalBooks = books.slice(0, total);
  
  res.render("books/index", {
    books: db.get("books").value().slice(start, end),
    totalBooks,
    perPage,
    page
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
  req.body.id = shortid.generate();
  
  if(!req.file) {
    req.body.coverUrl = "https://cdn.glitch.com/4ab1e734-3748-4dc8-bdb9-eb00249751c5%2Fdefault.jpeg?v=1589210447754"
  }else {
    req.body.coverUrl = req.file.path.split('/').slice(1).join('/');
  }
  
  console.log("url", req.body)
  
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
  if(!req.file){
    db.get("books").find({ id }).assign({ title, description }).write();
    res.redirect("/books");
    return;
  }
  
  const coverUrl = req.file.path.split('/').slice(1).join('/');
  db.get("books").find({ id }).assign({ title, description, coverUrl }).write();
  res.redirect("/books")
}

module.exports.delete = (req, res) => {
  const id = req.params.id;
  const book = db.get("books").find({ id }).value();
  const books = db.get("books").value();
  
  const page = req.query.page || 1; // n
  const perPage = 10 // x
  
  const start = (page - 1) * perPage;
  const end = page * perPage
  
  const total = Math.ceil(books.length / perPage);
  const totalBooks = books.slice(0, total);
  
  if(book) {
    db.get("books").remove({ id: book.id }).write();
    res.render("books/index", {
      books: db.get("books").value().slice(start, end),
      totalBooks,
      perPage,
      page
    });
  }
}