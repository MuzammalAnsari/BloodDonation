const express = require("express");
const bodyParser = require("body-parser");
const app = express()


app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.send('Hello World!')
})

const donorRoute = require('./routes/donorRoute');
app.use('/donor',donorRoute)

app.listen(3000, ()=>{
    console.log('server is running on port 3000')
})