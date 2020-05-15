const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  id: {
    type: String,
    trim: true
  },
})

const Session = new mongoose.model('Book', bookSchema);

module.exports = Book;