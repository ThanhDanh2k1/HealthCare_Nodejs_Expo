const express = require(`express`);
const router = express.Router();
// 
const { auth } = require('../midleware')
// 
const { chat } = require('../controllers')

// auth
router.route(`/group/create`).post(auth, chat.createGroup);
router.route(`/create`).post(auth, chat.createMess);

// get
router.route(`/group/all`).get(auth, chat.getAllGroups);
router.route(`/read`).get(auth, chat.readMess);

// update
router.route(`/group/update`).patch(auth, chat.updateGroup);

// delete
router.route(`/group/delete`).post(auth, chat.deleteGroup);
router.route(`/delete`).post(auth, chat.deleteMess);

module.exports = router;
