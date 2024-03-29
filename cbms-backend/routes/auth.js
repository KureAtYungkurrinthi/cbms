const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

const methodNotAllowed = async (req, res) => res.sendStatus(405);

router.route('/')
    .post(authController.login)
    .get(authController.refreshToken)
    .delete(authController.logout)
    .all(methodNotAllowed);

module.exports = router;