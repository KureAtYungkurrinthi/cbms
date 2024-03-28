const crypto = require('node:crypto');
const User = require('../models/User');

const getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll({
            attributes: {exclude: ['hash', 'salt']}
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
        const id = req?.params?.id;
        if (!id) {
            return res.status(400).json({'message': 'User ID required'});
        }
        const user = await User.findByPk(id, {
            attributes: {exclude: ['hash', 'salt']}
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
    try {
        const {name, email, role, password} = req.body;
        if (!name || !email || !password || !role) {
            return res.status(400).json({'message': 'Name, email, role, and password are required'});
        }

        // Hash the password
        const salt = crypto.randomBytes(16).toString("hex");
        const hash = crypto.scryptSync(password, salt, 64).toString('hex');

        const [user, created] = await User.findOrCreate({
            where: {email: email},
            defaults: {name: name, role: role, hash: hash, salt: salt}
        });

        if (created) {
            // Avoid returning hashed password back to frontend
            delete user.dataValues.hash;
            delete user.dataValues.salt;
            return res.status(201).json(user);
        } else {
            return res.status(400).json({'message': 'Email is already registered'});
        }
    } catch (error) {
        console.error('Error creating user:', error);
        return res.status(500).json({'message': 'Internal Server Error'});
    }
};

const updateUser = async (req, res) => {
    try {
        const id = req.params.id;
        const { name, email, role, password } = req.body;
        if (!name && !email && !password && !role) {
            return res.status(400).json({'message': 'Name, email, role, and password are required'});
        }

        const user = await User.findByPk(id);
        if (user) {
            if (name) user.name = name;
            if (email) user.email = email;
            if (role) user.role = role;
            if (password) {
                user.salt = crypto.randomBytes(16).toString("hex");
                user.hash = crypto.scryptSync(password, user.salt, 64).toString('hex');
            }
            await user.save();
            delete user.dataValues.hash;
            delete user.dataValues.salt;
            return res.json(user);
        } else {
            return res.status(204).json({message: 'User not found'});
        }
    } catch (error) {
        console.error('Error updating user:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

const deleteUser = async (req, res) => {

};

module.exports = {getAllUsers, getUserById, createUser, updateUser, deleteUser};