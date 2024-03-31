const User = require("../models/User");
const crypto = require("node:crypto");
const jwt = require("jsonwebtoken");

const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET;

const generateAccessToken = (user) => {
    return jwt.sign({id: user.id, email: user.email, role: user.role}, accessTokenSecret, {expiresIn: '15m'});
};

const generateRefreshToken = (user) => {
    return jwt.sign({id: user.id, email: user.email, role: user.role}, refreshTokenSecret, {expiresIn: '1d'});
};

const login = async (req, res) => {
    try {
        const {email, password} = req.body;
        if (!email || !password) return res.status(400).json({message: 'Missing email or password'});

        const user = await User.findOne({where: {email: email}});
        if (!user) return res.sendStatus(401);

        if (crypto.scryptSync(password, user.salt, 64).toString('hex') !== user.hash) {
            return res.sendStatus(401);
        }

        const accessToken = generateAccessToken(user);
        const refreshToken = generateRefreshToken(user);

        user.token = crypto.scryptSync(refreshToken, user.salt, 64).toString('hex');
        await user.save();

        return res.cookie('jwt', refreshToken, {httpOnly: true, maxAge: 24 * 60 * 60 * 1000}).json(accessToken);
    } catch (error) {
        console.error('Error login user:', error);
        return res.status(500).json({message: 'Internal Server Error'});
    }
};

const refreshToken = async (req, res) => {
    try {
        const refreshToken = req.cookies.jwt;
        if (!refreshToken) return res.sendStatus(401);

        jwt.verify(refreshToken, refreshTokenSecret, async (err, decoded) => {
            if (err) return res.sendStatus(403);
            const user = await User.findByPk(decoded.id);
            if (!user || crypto.scryptSync(refreshToken, user.salt, 64).toString('hex') !== user.token) {
                return res.sendStatus(403);
            }
            const accessToken = generateAccessToken(user);
            const newRefreshToken = generateRefreshToken(user);
            user.token = crypto.scryptSync(newRefreshToken, user.salt, 64).toString('hex');
            await user.save();
            return res.cookie('jwt', newRefreshToken, {httpOnly: true, maxAge: 24 * 60 * 60 * 1000}).json(accessToken);
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

        jwt.verify(refreshToken, refreshTokenSecret, async (err, decoded) => {
            if (err) return res.sendStatus(403);
            const user = await User.findByPk(decoded.id);
            if (!user || crypto.scryptSync(refreshToken, user.salt, 64).toString('hex') !== user.token) {
                return res.sendStatus(403);
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