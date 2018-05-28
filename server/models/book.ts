import * as mongoose from 'mongoose';

const BookSchema = new mongoose.Schema({
  isbn: String,
  title: String,
  author: String,
  description: String,
  published_year: String,
  publisher: String,
  updated_date: {type: Date, default: Date.now}
});

const Book = mongoose.model('Book', BookSchema);
export default Book;

