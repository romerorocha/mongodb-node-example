const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  title: String,
  body: String,
  author: String,
});

module.exports = PostSchema;
