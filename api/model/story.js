// The Story model

var mongoose = require('mongoose')
  , Schema = mongoose.Schema
  , ObjectId = Schema.ObjectId;

var storySchema = new Schema({

  date: { type: Date, default: Date.now },
  contributions: [],
  title: {},
  players: []
});

module.exports = mongoose.model('Story', storySchema)