const express = require('express');
const router = express.Router();
const meetingsController = require('../controllers/meetingsController');
const agendasController = require('../controllers/agendasController');
const {verifyRoles} = require('../lib/verifier');

const methodNotAllowed = async (req, res) => res.sendStatus(405);

router.route('/')
    .get(meetingsController.getAllMeetings)
    .post(verifyRoles, meetingsController.createMeeting)
    .all(methodNotAllowed);

router.route('/:id')
    .get(meetingsController.getMeetingById)
    .put(verifyRoles, meetingsController.updateMeeting)
    .delete(verifyRoles, meetingsController.deleteMeeting)
    .all(methodNotAllowed);

router.route('/:id/agendas')
    .get(agendasController.getAgendas)
    .post(verifyRoles, agendasController.createAgendas)
    .put(verifyRoles, agendasController.updateAgendas)
    .delete(verifyRoles, agendasController.deleteAgendas)
    .all(methodNotAllowed);

module.exports = router;