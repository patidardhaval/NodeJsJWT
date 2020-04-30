const express = require('express')
const User = require('../models/User')
const Product = require('../models/Product')
const auth = require('../middleware/auth')

const router = express.Router()

router.post('/users', async (req, res) => {
    // Create a new user
    try {
        const user = new User(req.body)
        await user.save()
        const token = await user.generateAuthToken()
        res.status(201).send({ user, token })
    } catch (error) {
        res.status(400).send(error)
    }
})

router.post('/users/login', async (req, res) => {
    //Login a registered user
    try {
        const { email, password } = req.body
        const user = await User.findByCredentials(email, password)
        let success = true;
        if (!user) {
            success = false;
            return res.status(401).send({ error: 'Login failed! Check authentication credentials' })
        }
        const token = await user.generateAuthToken(req)
        
        res.send({ user, token,success })
    } catch (error) {
        res.status(400).send(error)
    }

})

router.get('/users/me', auth, async (req, res) => {
    // View logged in user profile
    res.send(req.user)
})

router.post('/users/me/logout', auth, async (req, res) => {
    // Log user out of the application
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token != req.token
        })
        await req.user.save()
        res.send()
    } catch (error) {
        res.status(500).send(error)
    }
})

router.post('/users/me/logoutall', auth, async (req, res) => {
    // Log user out of all devices
    try {
        req.user.tokens.splice(0, req.user.tokens.length)
        await req.user.save()
        res.send()
    } catch (error) {
        res.status(500).send(error)
    }
})

/* product routes */

router.post('/product', async (req, res) => {
    
    const products = new Product(req.body);
    try {
        await products.save();
        res.send(products);
    } catch (err) {
        res.status(500).send(err);
    }

})

router.get('/product', auth,async (req, res) => {
    try {
        const product = await Product.find()
        if (!product) {
            return res.status(404).send({ error: 'no product found' })
        }
        res.send({ product, product })
    } catch (error) {
        res.status(400).send(error)
    }

})

router.get('/product/:id',auth, async (req, res) => {
    try {
        const product = await Product.findById(req.params.id)
        if (!product) {
            return res.status(404).send({ error: 'Login failed! Check authentication credentials' })
        }
        res.send({ product, product })
    } catch (error) {
        res.status(400).send(error)
    }

})

router.delete('/product/:id',auth, async (req, res) => {
    try {
        const product = await Product.findByIdAndRemove(req.params.id)
        let message = "Product Deleted";
        let success = true;
        if (!product) {
            message = "Product Not Found";
            return res.status(404).send({ error: message })
        }
        res.send({ product, product,success,message })
    } catch (error) {
        res.status(400).send(error)
    }

})

router.put('/product/:id',auth, async (req, res) => {
    
    try {
        const product = await Product.findByIdAndUpdate(req.params.id,req.body)
        if (!product) {
            return res.status(404).send({ error: 'Product Not Found' })
        }
        res.send({ product, product })
    } catch (error) {
        res.status(400).send(error)
    }

})

module.exports = router