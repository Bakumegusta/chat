require('dotenv/config');
import express, { json, static } from 'express';
const app = express()
import { connect, connection } from 'mongoose';
const port = process.env.PORT || 3000;
// db connect
connect(process.env.DATABASE_URL, { useNewUrlParser: true })
const db = connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to Database'))

app.use(json())
app.use(static('public'));

// routes
import chatdataRouter from './routes/chatdata';


// middleware
app.use('/chatdata', chatdataRouter)


// app listen
app.listen(port, () => console.log(`Server Started at port ${port}`))





