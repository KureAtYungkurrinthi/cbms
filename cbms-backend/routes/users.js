const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');

// The 405 handler
const methodNotAllowed = async (req, res) => res.sendStatus(405);

router.route('/')
    .get(usersController.getAllUsers)
    .post(usersController.createUser)
    .all(methodNotAllowed);

router.route('/:id')
    .get(usersController.getUserById)
    .put(usersController.updateUser)
    .delete(usersController.deleteUser)
    .all(methodNotAllowed);

module.exports = router;