require('dotenv').config()
const express = require('express');
const createError = require('http-errors')
const multer = require('multer');
const path = require('path');

// 
const router = require('./router/index')
const ConfigSQLite = require('./config/sqlite')

const app = express();

// // cấu hình nhận req từ dạng khác
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Cấu hình cors
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.header('Access-Control-Allow-Headers', 'x-access-token, Origin, X-Requested-With, Content-Type, Accept');
    next();
});

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// // cấu hình nhận req từ form-data
const upload = multer();
app.use(upload.none())

// create table in database
db = new ConfigSQLite
db.connectDatabase()
db.createTable()
db.closeDatabase()

// gọi qua router
app.use('/', router)
    .use((req, res, next) => {
        next(new Error(`404: Đường dẫn không tồn tại!`));
    })
    .use((error, req, res, next) => {
        console.log(error);
        let message = error.message.split(`: `).map((v) => (Number(v) ? Number(v) : v));
        let httpError = createError(...message);
        res.status(httpError.statusCode || 500).send(httpError);
    });

// chạy code với cổng process.env.PORT || 3001
try {
    app.listen(process.env.PORT || 3001, (error) => {
        console.log("Server is Successfully Running. http://localhost:" + process.env.PORT)
    });
} catch (error) {
    console.log("Error occurred, server can't start", error);
}
