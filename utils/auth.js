const JWT = require('jsonwebtoken')
require('dotenv').config();

const secret = process.env.SECRET_JWT_KEY;

const createToken = (user) => {
    const payload = {
        _id: user._id,
        email: user.email,
        name: user.name,
    }

    const token = JWT.sign(payload, secret);

    return token;
}

const verifyToken = (token) => {
    const payload = JWT.verify(token, secret);

    return payload;
}

module.exports = {
    createToken,
    verifyToken,
}