'use strict';

const { body } = require('express-validator');

module.exports = [
    body('title', 'Title is required').notEmpty(),
    body('skills', 'Skills are required').notEmpty()
];