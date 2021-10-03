'use strict';

const router = require('express').Router();

router.get('/', async (req, res) => res.send('Profiles path'));

module.exports = router;