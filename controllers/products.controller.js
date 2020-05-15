// const db = require("../db");
const Book = require("../models/books");

module.exports.index = async (req, res) => {
  const products = await Book.find({})
  res.render("books/products", {
    products
  });
};