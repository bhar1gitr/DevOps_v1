const express = require('express');
const router = express.Router();
const Multer = require("multer");

const { Register,Login,getMembers,fetchEvents,getDetailedEvent,storeFeedback,loadFeedbacks,logout } = require('../controllers/studentController');

const storage = new Multer.memoryStorage();
const upload = Multer({
  storage,
})

router.route('/getSelectedEvent/:id').get(getDetailedEvent);
router.route('/postFeedback').post(storeFeedback);
router.route('/getFeedbacks').post(loadFeedbacks);
router.route('/student/register').post(Register);
router.route('/student/logout').post(logout);
router.route('/student/login').post(Login);
router.route('/events').get(fetchEvents);
router.route('/members').get(getMembers);

module.exports = router;