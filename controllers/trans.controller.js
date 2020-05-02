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
  const userId = db
    .get("users")
    .find({ id: req.params.id })
    .value();
  req.body.id = shortid.generate();
  req.body.userId = userId.id;
  req.body.bookId = shortid.generate();
  const trans = db
    .get("trans")
    .push(req.body)
    .write();
  res.redirect("/trans");
};

