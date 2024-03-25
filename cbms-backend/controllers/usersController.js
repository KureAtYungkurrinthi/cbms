const User = require('../models/User');

const getAllUsers = async (req, res) => {
    const users = await User.findAll();
    if (!users) return res.status(204).json({ 'message': 'No users found' });
    res.json(users);
};
const getUserById = async (req, res) => {

};
const createUser = async (req, res) => {

};

const updateUser = async (req, res) => {

};

const deleteUser = async (req, res) => {

};

module.exports = { getAllUsers, getUserById, createUser, updateUser, deleteUser };
