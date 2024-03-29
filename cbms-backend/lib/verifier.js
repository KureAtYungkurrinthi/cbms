const jwt = require('jsonwebtoken');

const verifyJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith('Bearer ')) return res.sendStatus(401);
    const token = authHeader.split(' ')[1];
    console.log(token)
    jwt.verify(token, process.env.ACCESS_SECRET, (err, decoded) => {
        if (err) return res.sendStatus(403); //invalid token
        req.id = decoded.id;
        req.name = decoded.name;
        req.email = decoded.email;
        req.role = decoded.role;
        next();
    });
}

const verifyRoles = (...allowedRoles) => {
    return (req, res, next) => {
        if (!req?.role) return res.sendStatus(401);
        const rolesArray = [...allowedRoles];
        const result = req.role.map(role => rolesArray.includes(role)).find(val => val === true);
        if (!result) return res.sendStatus(401);
        next();
    }
}

module.exports = {verifyJWT, verifyRoles};