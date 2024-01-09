const express = require(`express`);
const router = express.Router();
// 
const { autoData } = require('../controllers')

// auth
router.route(`/doctor`).post(autoData.autoDoctor);
router.route(`/specialist`).post(autoData.autoSpecialist);


module.exports = router;
