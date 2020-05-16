const Book = require("../../models/books");

module.exports.index = async (req, res) => {
  const products = await Book.find({ });
  res.json(products);
}

module.exports.create = async (req, res) => {
  const product = new Book(req.body);
  await product.save();
  
  res.json(product);
}