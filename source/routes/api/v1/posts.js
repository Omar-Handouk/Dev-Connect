'use strict';

const router = require('express').Router();

router.get('/', async (req, res) => res.send('Posts path'));

module.exports = router;