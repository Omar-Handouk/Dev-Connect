'use strict';

const { body } = require('express-validator');

module.exports = [
    body('name', 'Name is required').notEmpty(),
    body('email', 'Valid email is required').notEmpty().bail().isEmail(),
    body('password', 'Strong password is required').notEmpty().bail().isStrongPassword()
];