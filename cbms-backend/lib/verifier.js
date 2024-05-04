const jwt = require('jsonwebtoken');

const verifyJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) return res.status(401).json({message: 'Authorization header missing or malformed'});

    const token = authHeader.split(' ')[1];
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) {
            if (err.name === 'JsonWebTokenError') {
                return res.status(403).json({message: 'Invalid token'});
            } else if (err.name === 'TokenExpiredError') {
                return res.status(403).json({message: 'Token expired'});
            } else {
                return res.status(500).json({message: 'Internal Server Error'});
            }
        }
        req.decoded = decoded;
        next();
    });
}

const verifyRoles = (req, res, next) => {
    if (!req?.decoded?.role) return res.sendStatus(401);
    if (req.decoded.role !== 'admin') return res.sendStatus(403);
    next();
}

module.exports = {verifyJWT, verifyRoles};