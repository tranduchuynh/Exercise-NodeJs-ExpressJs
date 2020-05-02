const shortid = require("shortid");
const db = require("../db");

module.exports.index = (req, res) => {
  res.render("trans/index", {
    trans: db.get("trans").value()
  });
};

module.exports.create = (req, res) => {
  res.render("trans/create", {
    users: db.get("users").value()
  });
};

module.exports.postCreate = (req, res) => {
  console.log(req.body)
  req.body.id = shortid.generate();
  req.body.userId = shortid.generate();
  req.body.bookId = shortid.generate();
  req.body.isComplete = false;
  const trans = db
    .get("trans")
    .push(req.body)
    .write();
  res.redirect("/trans");
};

module.exports.complete = (req, res) => {
  const id = req.params.id;
  db.get("trans")
    .find({ id })
    .assign({ isComplete: true })
    .write();
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
