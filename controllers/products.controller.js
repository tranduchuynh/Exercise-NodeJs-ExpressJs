const db = require("../db");


module.exports.index = (req, res) => {
  res.render("books/products", {
    products: db.get("books").value()
  });
};