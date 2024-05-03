const express = require('express');
const router = express.Router();
const meetingsController = require('../controllers/meetingsController');
const agendasController = require('../controllers/agendasController');

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

router.route('/:id/agendas')
    .get(agendasController.getAgendas)
    .post(agendasController.createAgendas)
    .put(agendasController.updateAgendas)
    .delete(agendasController.deleteAgendas)
    .all(methodNotAllowed);

module.exports = router;