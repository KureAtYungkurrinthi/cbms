const express = require('express');
const router = express.Router();
const roomsController = require('../controllers/roomsController');

const methodNotAllowed = async (req, res) => res.sendStatus(405);

router.route('/')
    .get(roomsController.getAllRooms)
    .post(roomsController.createRoom)
    .all(methodNotAllowed);

router.route('/:id')
    .get(roomsController.getRoomById)
    .put(roomsController.updateRoom)
    .delete(roomsController.deleteRoom)
    .all(methodNotAllowed);

module.exports = router;