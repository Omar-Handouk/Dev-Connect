'use strict';

const router = require('express').Router();

router.get('/', async (req, res) => res.send('Authentication path'));

module.exports = router;