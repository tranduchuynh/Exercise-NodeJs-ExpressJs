const shortid = require("shortid");
const db = require("../db");

module.exports.index = (req, res) => {
  res.render("users/index", {
    users: db.get("users").value()
  });
};

module.exports.search = (req, res) => {
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
};

module.exports.create = (req, res) => {
  req.body.id = shortid.generate();
  const errors = [];
  if(!req.body.name || req.body.name.length > 30) {
     errors.push("Name is required and less than 30");
  }
  
  if(!req.body.phone){
    errors.push("Phone is required.");
  }
  
  console.log("erors", errors)
  
  if(errors.length) {
    res.render("users/create", {
      errors,
      values: req.body
    });
    return;
  }
  
  db.get("users")
    .push(req.body)
    .write();
  res.redirect("/users");
};

module.exports.getId = (req, res) => {
  const id = req.params.id;
  const name = db
    .get("users")
    .find({ id })
    .value();
  res.render("users/view", {
    name
  });
};

module.exports.edit = (req, res) => {
  const id = req.params.id;
  const user = db
    .get("users")
    .find({ id })
    .value();
  res.render("users/edit", {
    user
  });
};

module.exports.delete = (req, res) => {
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
};

module.exports.postEdit = (req, res) => {
  const id = req.params.id;
  const user = db
    .get("users")
    .find({ id })
    .assign({
      name: req.body.name,
      phone: req.body.phone
    })
    .write();
  res.redirect("/users");
};
