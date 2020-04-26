const mongoose = require('mongoose')

const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
       
    },
    detail: {
        type: String,
        required: true,
    }
})


const Product = mongoose.model('Product', productSchema)

module.exports = Product