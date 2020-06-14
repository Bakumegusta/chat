// require('dotenv').config()
// const express = require('express')
// const app = express()
// const mongoose = require('mongoose')
// const port = process.env.PORT || 3000;
// // db connect
// mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true })
// const db = mongoose.connection
// db.on('error', (error) => console.error(error))
// db.once('open', () => console.log('Connected to Database'))

// app.use(express.json())
// app.use(express.static('public'));

// // routes
// const chatdataRouter = require('./routes/chatdata')


// // middleware
// app.use('/chatdata', chatdataRouter)


// // app listen
// app.listen(port, () => console.log(`Server Started at port ${port}`))



const express = require("express");
const app = express();
const mongoose = require('mongoose')
 require('dotenv/config');
const port = process.env.PORT || 9000;
app.listen(port, ()=> console.log(`listenng at ${port}`));
app.use(express.static('public'));
app.use(express.json());


// routes
const chatdataRouter = require('./routes/chatdata')


// middleware
app.use('/chatdata', chatdataRouter)

// db connect
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true })
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to Database'))