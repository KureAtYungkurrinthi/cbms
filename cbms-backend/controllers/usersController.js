const User = require('../models/User');

const getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll({
            attributes: {exclude: ['password']}
        });
        if (users.length > 0) {
            return res.json(users);
        } else {
            return res.status(204).json({'message': 'No users found'});
        }
    } catch (error) {
        console.error('Error fetching users:', error);
        return res.status(500).json({'message': 'Internal Server Error'});
    }
};

const getUserById = async (req, res) => {
    try {
        const userId = req?.params?.id;
        if (!userId) {
            return res.status(400).json({'message': 'User ID required'});
        }
        const user = await User.findByPk(userId, {
            attributes: {exclude: ['password']}
        });
        if (user) {
            return res.json(user);
        } else {
            return res.status(204).json({'message': 'User not found'});
        }
    } catch (error) {
        console.error('Error fetching user by ID:', error);
        return res.status(500).json({'message': 'Internal Server Error'});
    }
};


const createUser = async (req, res) => {

};

const updateUser = async (req, res) => {

};

const deleteUser = async (req, res) => {

};

module.exports = {getAllUsers, getUserById, createUser, updateUser, deleteUser};