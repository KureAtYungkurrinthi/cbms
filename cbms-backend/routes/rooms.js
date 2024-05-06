const express = require('express');
const router = express.Router();
const roomsController = require('../controllers/roomsController');
const {verifyRoles} = require('../lib/verifier');

const methodNotAllowed = async (req, res) => res.sendStatus(405);

router.route('/')
    .get(roomsController.getAllRooms)
    .post(verifyRoles, roomsController.createRoom)
    .all(methodNotAllowed);

router.route('/:id')
    .get(roomsController.getRoomById)
    .put(verifyRoles, roomsController.updateRoom)
    .delete(verifyRoles, roomsController.deleteRoom)
    .all(methodNotAllowed);

module.exports = router;