const crypto = require('node:crypto');
const User = require('../models/User');

const getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll({
            attributes: {exclude: ['hash', 'salt', 'token', 'createdAt', 'updatedAt']}
        });
        if (users.length > 0) {
            return res.json(users);
        } else {
            return res.status(404).json({message: 'No users found'});
        }
    } catch (error) {
        console.error('Error fetching users:', error);
        return res.status(500).json({message: 'Internal Server Error'});
    }
};

const getUserById = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id, {
            attributes: {exclude: ['hash', 'salt', 'token']}
        });
        if (user) {
            return res.json(user);
        } else {
            return res.status(404).json({message: 'User not found'});
        }
    } catch (error) {
        console.error('Error fetching user by ID:', error);
        return res.status(500).json({message: 'Internal Server Error'});
    }
};


const createUser = async (req, res) => {
    try {
        if (req.decoded.role !== 'admin') return res.status(403).json({message: 'Only admins can create users'});

        const {name, email, role, password} = req.body;
        if (!name || !email || !password || !role) return res.status(400).json({message: 'Name, email, role, and password are required'});

        // Hash the password
        const salt = crypto.randomBytes(16).toString("hex");
        const hash = crypto.scryptSync(password, salt, 64).toString('hex');

        const [user, created] = await User.findOrCreate({
            where: {email: email}, defaults: {name: name, role: role, hash: hash, salt: salt}
        });
        if (!created) return res.status(409).json({message: 'Email is already registered'});

        // Avoid returning hashed password back to frontend
        delete user.dataValues.hash;
        delete user.dataValues.salt;
        delete user.dataValues.token;
        return res.status(201).json(user);
    } catch (error) {
        console.error('Error creating user:', error);
        return res.status(500).json({message: 'Internal Server Error'});
    }
};

const updateUser = async (req, res) => {
    try {
        if (req.decoded.role !== 'admin' && req.params.id !== req.decoded.id) return res.status(403).json({message: 'Members can only update their own details'});

        const {name, email, role, password} = req.body;
        if (!name && !email && !password && !role) return res.status(400).json({message: 'Name, email, role, or password are required'});

        const user = await User.findByPk(req.params.id);
        if (!user) return res.status(404).json({message: 'User not found'});

        if (name) user.name = name;
        if (email) user.email = email;
        if (role) user.role = role;
        if (password) {
            user.salt = crypto.randomBytes(16).toString("hex");
            user.hash = crypto.scryptSync(password, user.salt, 64).toString('hex');
        }
        await user.save();

        // Avoid returning hashed password back to frontend
        delete user.dataValues.hash;
        delete user.dataValues.salt;
        delete user.dataValues.token;
        return res.json(user);
    } catch (error) {
        console.error('Error updating user:', error);
        return res.status(500).json({message: 'Internal Server Error'});
    }
};

const deleteUser = async (req, res) => {
    try {
        if (req.decoded.role !== 'admin' && req.params.id !== req.decoded.id) return res.status(403).json({message: 'Members can only delete their own details'});

        const user = await User.findByPk(req.params.id);
        if (!user) return res.status(404).json({message: 'User not found'});

        // Delete the user
        await user.destroy();
        return res.json(user);
    } catch (error) {
        console.error('Error deleting user:', error);
        return res.status(500).json({message: 'Internal Server Error'});
    }
};

module.exports = {getAllUsers, getUserById, createUser, updateUser, deleteUser};