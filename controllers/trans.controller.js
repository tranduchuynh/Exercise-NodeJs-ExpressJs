const shortid = require("shortid");
const db = require("../db");

module.exports.index = (req, res) => {
  const id = req.signedCookies.userId;
  const user = db.get("users").find({ id }).value();
  const trans = db.get("trans").value()
  res.render("trans/index", {
    trans: db.get("trans").value(),
    user
  });
};

module.exports.create = (req, res) => {
  res.render("trans/create", {
    users: db.get("users").value(),
    books: db.get("books").value()
  });
};

module.exports.postCreate = (req, res) => {
  const name = req.body.formTrans[0];
  const title = req.body.formTrans[1];
  const userId = db
    .get("users")
    .find({ name })
    .value();
  const bookId = db
    .get("books")
    .find({ title })
    .value();
  req.body.id = shortid.generate();
  req.body.userId = userId.id;
  req.body.bookId = bookId.id;
  req.body.isComplete = false;
  const trans = db
    .get("trans")
    .push(req.body)
    .write();
  res.redirect("/trans");
};

module.exports.complete = (req, res) => {
  const id = req.params.id;
  const tran = db.get("trans").find({ id }).value();
  
  if(!tran){
    res.render("trans/index", {
      error: "Not found trans"
    })
  }
  db.get("trans").find({ id }).assign({ isComplete: true }).write();
  res.render("trans/index", {
    trans: db.get("trans").value()
  });
};

module.exports.delete = (req, res) => {
  const id = req.params.id;
  db.get("trans")
    .remove({ id })
    .write();
  res.render("trans/index", {
    trans: db.get("trans").value()
  });
};

module.exports.search = (req, res) => {
  const q = req.query.q;
  console.log(q);
  const transSearch = db
    .get("trans")
    .value()
    .filter(tran => {
      return tran.formTrans[0].toLowerCase().indexOf(q.toLowerCase()) !== -1;
    });

  if (!transSearch) {
    transSearch = "";
  }

  res.render("trans/index", {
    trans: transSearch
  });
};
