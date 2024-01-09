const express = require(`express`);
const router = express.Router();

// 
const { search } = require('../controllers')

// auth
router.route(`/doctor`).post(search.getDoctor);
router.route(`/data`).post(search.searchData);


module.exports = router;
