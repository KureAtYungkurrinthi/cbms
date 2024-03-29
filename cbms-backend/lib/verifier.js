const jwt = require('jsonwebtoken');

const verifyJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) return res.sendStatus(401);
    const token = authHeader.split(' ')[1];
    jwt.verify(token, process.env.ACCESS_SECRET, (err, decoded) => {
        if (err) return res.sendStatus(403); //invalid token
        req.id = decoded.id;
        req.name = decoded.name;
        req.email = decoded.email;
        req.role = decoded.role;
        next();
    });
}

module.exports = {verifyJWT};