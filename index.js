const express = require("express");
const app = express();
const Datastore = require('nedb');
const port = process.env.PORT || 9000;
app.listen(port, ()=> console.log(`listenng at ${port}`));
app.use(express.static('public'));
app.use(express.json());

const database = new Datastore('chat.db');
database.loadDatabase();

app.get('/api', (request,response) =>{
    database.find({}, (err, data) =>{
    response.json(data);

    })
})

app.post('/api', (request,response) =>{
    // console.log(request.body);
    const data = request.body;
    database.insert(data);
    response.json({
        status:'success',
    })
})
