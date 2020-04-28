require('dotenv').config({ path: '../.env' });
const mongoose = require('mongoose')

mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: true,
    useUnifiedTopology: true
})

mongoose.connection.on("connected",()=>{
    console.log("Mongo Conntected To Remote Atlas")
})