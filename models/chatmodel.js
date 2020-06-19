const mongoose = require('mongoose')

const chatdata = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
 email: {
    type: String,
    required: true
  },
 query: {
    type: String,
    required: true
  },
  answer: {
    type: String,
    required: true
  },
 sessionID: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true,
    default: Date.now
  }
})

module.exports = mongoose.model('Chat', chatdata)