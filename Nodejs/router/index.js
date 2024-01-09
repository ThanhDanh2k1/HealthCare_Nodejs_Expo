const express = require('express');
const router = express.Router();

router.use('/user', require('./user'))
router.use('/chat', require('./chat'))
router.use('/calendar', require('./calendar'))
router.use('/specialist', require('./specialist'))
router.use('/auto', require('./autoData'))
router.use('/search', require('./search'))

module.exports = router;