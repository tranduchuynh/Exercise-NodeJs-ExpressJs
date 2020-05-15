const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  coverUrl: {
      type: String
  },
})

const Book = new mongoose.model('Book', bookSchema);

module.exports = Book;