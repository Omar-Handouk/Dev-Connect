'use strict';

const { body } = require('express-validator');

module.exports = [
    body('email', 'Valid e-mail required').exists().bail().isEmail(),
    body('password', 'Password is required').exists()
];