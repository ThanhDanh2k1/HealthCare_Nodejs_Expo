const express = require(`express`);
const router = express.Router();
// 
const { auth } = require('../midleware')
// 
const { calendar } = require('../controllers')

// auth
router.route(`/create`).post(auth, calendar.createCalendar);
router.route(`/update`).post(auth, calendar.updateCalendar);
router.route(`/get`).post(auth, calendar.getCalendar);
router.route(`/patient`).post(auth, calendar.getByPatient);
router.route(`/history`).post(auth, calendar.getHistory);
router.route(`/cancel`).post(auth, calendar.cancelCalendar);

module.exports = router;
