const express = require('express');
const router = express.Router();
const meetingsController = require('../controllers/meetingsController');

const methodNotAllowed = async (req, res) => res.sendStatus(405);

router.route('/')
    .get(meetingsController.getAllMeetings)
    .post(meetingsController.createMeeting)
    .all(methodNotAllowed);

router.route('/:id')
    .get(meetingsController.getMeetingById)
    .put(meetingsController.updateMeeting)
    .delete(meetingsController.deleteMeeting)
    .all(methodNotAllowed);

module.exports = router;