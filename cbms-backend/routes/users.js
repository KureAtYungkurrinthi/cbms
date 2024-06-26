const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');
const {verifyRoles} = require('../lib/verifier');

const methodNotAllowed = async (req, res) => res.sendStatus(405);

router.route('/')
    .get(usersController.getAllUsers)
    .post(verifyRoles, usersController.createUser)
    .all(methodNotAllowed);

router.route('/:id')
    .get(usersController.getUserById)
    .put(usersController.updateUser)
    .delete(usersController.deleteUser)
    .all(methodNotAllowed);

module.exports = router;