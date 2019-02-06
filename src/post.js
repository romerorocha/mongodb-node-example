const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Subdocument use case - Post
const PostSchema = new Schema({
  title: String,
  body: String,
});

module.exports = PostSchema;
