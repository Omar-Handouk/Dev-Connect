'use strict';

const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = (req, res, next) => {
    const token = req.header('x-auth-token');

    if (!token) {
        return res.status(401).json({ errors: [ {msg: 'No token supplied'} ]});
    }

    try {
        req.user = jwt.verify(token, config.get('jwtSecret')).user;
        next();
    } catch (err) {
        res.status(401).json({ errors: [ {msg: 'Invalid token'} ]});
    }
};