const mongoose = require('mongoose')

const productSchema = mongoose.Schema({
    prod_name: {
        type: String,
        required: true,
    },
    prod_desc: {
        type: String,
        required: true,
       
    },
    prod_price: {
        type: String,
        required: true,
    }
})


const Product = mongoose.model('Product', productSchema)

module.exports = Product