const jwt = require('jsonwebtoken')
const User = require('../models/User')
const auth = async (req, res, next) => {
    let token = req.header('Authorization');
    if (token && token.startsWith('Bearer ')) {
        token = token.slice(7, token.length);
    }
    if (token) {
        jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
            if (err) {
                return res.json({
                    success: false,
                    message: 'Token is not valid error'
                });
            } else {
                req.decoded = decoded;
                if(decoded.ip!==req.ip){
                    return res.json({
                        success: false,
                        message: 'Token is not valid.'
                    }); 
                }
                next();
            }
        });
    } else {
        return res.json({
            success: false,
            message: 'Token is not supplied'
        });
    }
}
module.exports = auth