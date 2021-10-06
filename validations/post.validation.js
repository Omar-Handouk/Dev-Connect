'use strict';

const { body } = require('express-validator');

module.exports = [
    body('body', 'Post body must be included').notEmpty(),
    body('title', 'Post title must be included').notEmpty()
];