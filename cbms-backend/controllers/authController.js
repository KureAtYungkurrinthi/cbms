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
        console.error('Error login user:', error);
        return res.status(500).json({'message': 'Internal Server Error'});
    }
};

const refreshToken = async (req, res) => {
    try {
        const cookies = req.cookies;
        if (!cookies?.jwt) return res.sendStatus(401);
        const refreshToken = cookies.jwt;
        res.clearCookie('jwt', {httpOnly: true, sameSite: 'None', secure: true});

        jwt.verify(refreshToken, process.env.REFRESH_SECRET, (err, decoded) => {
            if (err) return res.sendStatus(403); //invalid token
            req.id = decoded.id;
            req.name = decoded.name;
            req.email = decoded.email;
            req.role = decoded.role;
        });

        const user = await User.findByPk(req.id);
        if (!user) return res.sendStatus(403);

        if (crypto.scryptSync(refreshToken, user.salt, 64).toString('hex') !== user.token) {
            return res.sendStatus(403);
        } else {
            // Create JWT
            const accessToken = jwt.sign({
                'id': user.id, 'name': user.name, 'email': user.email, 'role': user.role
            }, process.env.ACCESS_SECRET, {expiresIn: '30s'});
            const newRefreshToken = jwt.sign({
                'id': user.id, 'name': user.name, 'email': user.email, 'role': user.role
            }, process.env.REFRESH_SECRET, {expiresIn: '1d'});

            // Save refreshToken in database
            user.token = crypto.scryptSync(newRefreshToken, user.salt, 64).toString('hex');
            await user.save();

            // Return accessToken and refreshToken (in cookies)
            return res.cookie('jwt', newRefreshToken, {httpOnly: true, maxAge: 24 * 60 * 60 * 1000}).json(accessToken);
        }
    } catch (error) {
        console.error('Error refresh access token:', error);
        return res.status(500).json({'message': 'Internal Server Error'});
    }
};

const logout = async (req, res) => {
    try {
        const cookies = req.cookies;
        if (!cookies?.jwt) return res.sendStatus(204); //No content
        const refreshToken = cookies.jwt;
        res.clearCookie('jwt', {httpOnly: true, sameSite: 'None', secure: true});

        // Is refreshToken in db?
        jwt.verify(refreshToken, process.env.REFRESH_SECRET, (err, decoded) => {
            if (err) return res.sendStatus(403); //invalid token
            req.id = decoded.id;
            req.name = decoded.name;
            req.email = decoded.email;
            req.role = decoded.role;
        });

        const user = await User.findByPk(req.id);
        if (!user) return res.sendStatus(403);

        if (crypto.scryptSync(refreshToken, user.salt, 64).toString('hex') !== user.token) {
            return res.sendStatus(403);
        } else {
            // Delete refreshToken in db
            user.token = null;
            await user.save();
            return res.sendStatus(200);
        }
    } catch (error) {
        console.error('Error logout:', error);
        return res.status(500).json({'message': 'Internal Server Error'});
    }
};

module.exports = {login, refreshToken, logout};