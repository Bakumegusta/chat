require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const port = process.env.PORT || 3000;
// db connect
var DATABASE_URL = 'mongodb+srv://baku:baku2020@cluster0.aleqr.mongodb.net/<dbname>?retryWrites=true&w=majority';
mongoose.connect(process.env.MONGODB_URI || DATABASE_URL, { useNewUrlParser: true })
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to Database'))

app.use(express.json())
app.use(express.static('public'));

// routes
const chatdataRouter = require('./routes/chatdata')


// middleware
app.use('/chatdata', chatdataRouter)


// app listen
app.listen(port, () => console.log(`Server Started at port ${port}`))