const express = require(`express`);
const router = express.Router();
const multer = require('multer');
const path = require('path');

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
const { auth, role } = require('../midleware')
// 
const { user } = require('../controllers')

// auth
router.route(`/register`).post(user.register);
router.route(`/login`).post(user.login);
router.route(`/changePass`).patch(user.changePass);
router.route(`/forget`).patch(user.forget);

// otp
router.route(`/otp`).post(user.getOtp);
router.route(`/verify`).post(user.verifyOtp);

// get
router.route(`/allDoctors`).post(user.getDoctors);
router.route(`/allPatients`).post(user.getPatients);

router.route(`/update`).put(auth, upload.single('image'), user.updateUser);

// delete
router.route(`/delete`).post(auth, role(['admin']), user.deleteUser);

// find
router.route(`/find`).post(user.find);

module.exports = router;
