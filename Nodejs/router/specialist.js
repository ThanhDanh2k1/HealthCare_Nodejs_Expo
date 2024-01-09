const express = require(`express`);
const router = express.Router();
const multer = require('multer');
const path = require('path');

// 
const { specialist } = require('../controllers')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/images'); // Thư mục lưu trữ ảnh
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

// 
router.route(`/get`).post(specialist.getData);
router.route(`/create`).post(upload.single('image'), specialist.addData);

module.exports = router;
