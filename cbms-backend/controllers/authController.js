const User = require("../models/User");
const crypto = require("node:crypto");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
    try {
        const {email, password} = req.body;
        if (!email || !password) return res.status(400).json({'message': 'Missing email or password'});

        const user = await User.findOne({where: {email: email}});
        if (!user) return res.sendStatus(401);

        if (crypto.scryptSync(password, user.salt, 64).toString('hex') !== user.hash) {
            return res.sendStatus(401);
        } else {
            // Create JWT
            const accessToken = jwt.sign({
                'id': user.id, 'name': user.name, 'email': user.email, 'role': user.role
            }, process.env.ACCESS_SECRET, {expiresIn: '30s'});
            const refreshToken = jwt.sign({
                'id': user.id, 'name': user.name, 'email': user.email, 'role': user.role
            }, process.env.REFRESH_SECRET, {expiresIn: '1d'});

            // Save refreshToken in database
            user.token = crypto.scryptSync(refreshToken, user.salt, 64).toString('hex');
            await user.save();

            // Return accessToken and refreshToken (in cookies)
            return res.cookie('jwt', refreshToken, {httpOnly: true, maxAge: 24 * 60 * 60 * 1000}).json(accessToken);
        }
    } catch (error) {
        console.error('Error updating user:', error);
        return res.status(500).json({'message': 'Internal Server Error'});
    }
};

const logout = async (req, res) => {

};

const refreshToken = async (req, res) => {

};

module.exports = {login, logout, refreshToken};