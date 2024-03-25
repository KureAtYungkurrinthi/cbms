const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');

router.route('/')
    .get(usersController.getAllUsers)
    .post(usersController.createUser);
router.route('/:userId')
    .get(usersController.getUserById)
    .post(usersController.updateUser)
    .delete(usersController.deleteUser);

module.exports = router;