'use strict';

const router = require('express').Router();
const auth = require('../../../../middleware/authVerf');
const validation = require('../../../../validations/auth.validation');
const { validationResult } =require('express-validator');
const { index, create } = require('../../../services/auth-service');

router.get('/', auth, async (req, res) => {
    try {
        const user = await index(req.user);

        res.status(200).json(user);
    } catch (err) {
        res.status(400).json({ errors: [ {msg: err.message} ]});
    }
});

router.post('/', validation, async (req, res) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const token = await create(req.body);

        res.status(200).json({jwt: token});
    } catch (err) {
        res.status(400).json({ errors: [ {msg: err.message} ]});
    }
});

module.exports = router;