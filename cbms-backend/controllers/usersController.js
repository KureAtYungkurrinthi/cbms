const User = require('../models/User');

const getAllUsers = async (req, res) => {
    const users = await User.findAll({
        attributes: {exclude: ['password']}
    });
    return users ? res.json(users) : res.status(204).json({'message': 'No users found'});
};

const getUserById = async (req, res) => {
    if (!req?.params?.id) return res.status(400).json({'message': 'User ID required'});
    const user = await User.findByPk(req.params.id, {
        attributes: {exclude: ['password']}
    });
    return user ? res.json(user) : res.status(204).json({'message': 'User not found'});
};

const createUser = async (req, res) => {

};

const updateUser = async (req, res) => {

};

const deleteUser = async (req, res) => {

};

module.exports = {getAllUsers, getUserById, createUser, updateUser, deleteUser};