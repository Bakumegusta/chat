const express = require("express");
const app = express();

app.listen(9000, ()=> console.log('listenng at 9000'));
app.use(express.static('public'));
app.use(express.json());

app.post('/api', (request,response) =>{
    console.log(request.body);
    response.json({
        status:'success',
    })
})
