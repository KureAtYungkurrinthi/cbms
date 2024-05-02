const User = require("../models/User");
const crypto = require("node:crypto");
const jwt = require("jsonwebtoken");

const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET;

const generateAccessToken = (user) => {
    return jwt.sign({
        id: user.id, name: user.name, email: user.email, role: user.role
    }, accessTokenSecret, {expiresIn: '1h'});
};

const generateRefreshToken = (user) => {
    return jwt.sign({id: user.id}, refreshTokenSecret, {expiresIn: '1d'});
};

const login = async (req, res) => {
    try {
        const {email, password} = req.body;
        if (!email || !password) return res.status(400).json({message: 'Missing email or password'});

        const user = await User.findOne({where: {email: email}});
        if (!user) return res.status(401).json({message: 'Invalid email or password'});

        if (crypto.scryptSync(password, user.salt, 64).toString('hex') !== user.hash) {
            return res.status(401).json({message: 'Invalid email or password'});
        }

        const accessToken = generateAccessToken(user);
        const refreshToken = generateRefreshToken(user);

        user.token = crypto.scryptSync(refreshToken, user.salt, 64).toString('hex');
        await user.save();

        // Avoid returning hashed password back to frontend
        delete user.dataValues.hash;
        delete user.dataValues.salt;
        delete user.dataValues.token;
        return res.cookie('jwt', refreshToken, {httpOnly: true, maxAge: 24 * 60 * 60 * 1000}).json({accessToken, user});
    } catch (error) {
        console.error('Error login user:', error);
        return res.status(500).json({message: 'Internal Server Error'});
    }
};

const refreshToken = async (req, res) => {
    try {
        const refreshToken = req.cookies.jwt;
        if (!refreshToken) return res.status(401).json({message: 'No refresh token provided'});
        res.clearCookie('jwt', {httpOnly: true});

        jwt.verify(refreshToken, refreshTokenSecret, async (err, decoded) => {
            if (err) return res.status(403).json({message: 'Invalid refresh token'});

            const user = await User.findByPk(decoded.id);
            if (!user || crypto.scryptSync(refreshToken, user.salt, 64).toString('hex') !== user.token) {
                return res.status(403).json({message: 'Invalid refresh token'});
            }

            const accessToken = generateAccessToken(user);
            const newRefreshToken = generateRefreshToken(user);

            user.token = crypto.scryptSync(newRefreshToken, user.salt, 64).toString('hex');
            await user.save();

            // Avoid returning hashed password back to frontend
            delete user.dataValues.hash;
            delete user.dataValues.salt;
            delete user.dataValues.token;
            return res.cookie('jwt', newRefreshToken, {httpOnly: true, maxAge: 24 * 60 * 60 * 1000}).json({
                accessToken,
                user
            });
        });
    } catch (error) {
        console.error('Error refresh access token:', error);
        return res.status(500).json({message: 'Internal Server Error'});
    }
};

const logout = async (req, res) => {
    try {
        const refreshToken = req.cookies.jwt;
        if (!refreshToken) return res.sendStatus(204);
        res.clearCookie('jwt', {httpOnly: true});

        jwt.verify(refreshToken, refreshTokenSecret, async (err, decoded) => {
            if (err) return res.status(403).json({message: 'Invalid refresh token'});

            const user = await User.findByPk(decoded.id);
            if (!user || crypto.scryptSync(refreshToken, user.salt, 64).toString('hex') !== user.token) {
                return res.status(403).json({message: 'Invalid refresh token'});
            }

            user.token = null;
            await user.save();

            return res.sendStatus(200);
        });
    } catch (error) {
        console.error('Error logout:', error);
        return res.status(500).json({message: 'Internal Server Error'});
    }
};

module.exports = {login, refreshToken, logout};