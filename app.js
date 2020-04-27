require('dotenv').config({ path: '.env' });
const express = require('express')
const port = process.env.PORT || 3000

const userRouter = require('./routers')
require('./db/db')

const app = express()

app.all('*', function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.header('Access-Control-Allow-Headers', '*');
    next();
});

app.use(express.json())
app.use(express.urlencoded())
app.use(userRouter)


app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})