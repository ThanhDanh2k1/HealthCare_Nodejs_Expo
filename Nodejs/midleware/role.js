module.exports.role = (arr) => {
    return (req, res, next) => {
        const result = arr.includes(req.user.role)
        
        if (!result)
            return res.status(403).json('Không đủ quyền truy cập')

        next()
    }
}