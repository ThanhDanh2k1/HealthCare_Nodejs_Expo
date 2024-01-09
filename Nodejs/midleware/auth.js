const { jwt } = require('../utils')

module.exports.auth = async (req, res, next) => {
    let token = req.headers[`token`];

    if (!token)
        return res.status(401).json('Không tìm thấy token')

    try {
        const [decoded] = await Promise.all([
            jwt.verifyToken(token)
        ])
        req['user'] = decoded
        
        next()
    } catch (error) {
        res.status(401).json('Token không chính xác hoặc hết hạn')
    }
};
