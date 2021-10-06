'use strict';

const { body } = require('express-validator');

module.exports = {
    createValidation: [
        body('name', 'Name is required').notEmpty(),
        body('email', 'Valid email is required').notEmpty().bail().isEmail(),
        body('password', 'Strong password is required').notEmpty().bail().isStrongPassword()
    ],
    updateValidation: [
        body('avatar', 'Avatar field is not allowed').isEmpty(),
        body('date', 'Date field is not allowed').isEmpty(),
        body('email', 'Valid email is required').optional().isEmail(),
        body('password', 'Strong password is required').optional().isStrongPassword()
    ]
};