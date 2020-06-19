const express = require('express')
const router = express.Router()
const Chatdata = require('../models/chatmodel')

// Getting all
router.get('/', async (req, res) => {
  try {
    const chatdata = await Chatdata.find()
    res.json(chatdata)
    // console.log(chatdata);
    
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})


// Creating one
router.post('/', async (req, res) => {
  const chatdata = new Chatdata({
    name: req.body.name,
    email: req.body.email,
    query: req.body.user,
    answer: req.body.answer,
    sessionID: req.body.sessionID
  })
  try {
    const newChatdata = await chatdata.save()
    res.status(201).json(newChatdata)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})




module.exports = router