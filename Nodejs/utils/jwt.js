const jwt = require('jsonwebtoken');

// Mã hóa JWT
const secretKey = process.env.TOKEN_KEY;
const tokenLife = process.env.TOKEN_LIFE;

const createToken = (data) => {
    return new Promise((resolve, reject) => {
        jwt.sign(
            data,
            secretKey,
            {
                algorithm: `HS256`,
                expiresIn: tokenLife,
            },
            (error, token) => {
                if (error)
                    return reject(error)
                resolve(token)
            }
        )
    })
}

const verifyToken = (token) => {
    return new Promise((resolve, reject) => {
        jwt.verify(
            token,
            secretKey,
            (error, decoded) => {
                if (error)
                    return reject(error)
                resolve(decoded)
            }
        );
    })
}

module.exports = { createToken, verifyToken };