'use strict';

const router = require('express').Router();

module.exports = (app) => {

    router.use('/auth', require('./auth'));
    router.use('/posts', require('./posts'));
    router.use('/profiles', require('./profiles'));
    router.use('/users', require('./users'));

    app.use('/api/v1', router);
}