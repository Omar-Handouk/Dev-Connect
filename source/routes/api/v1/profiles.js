'use strict';

const router = require('express').Router();
const { index, create, show, update, destroy } = require('../../../services/profiles-service');
const { validationResult } = require('express-validator');
const validation = require('../../../../validations/profile.validation');
const auth = require('../../../../middleware/authVerf');
const time = require('../../../../utils/time');

router.get('/', async (req, res) => {
    try {
        const profiles = await index();

        res.status(200).json(profiles);
    } catch (err) {
        console.error(`[Error][${time()}][${__filename}] > ${err.message}`);
        res.status(500).json({ errors: [ {msg: err.message} ]});
    }
});

router.post('/', auth, validation, async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const profile = await create(req.user.id, req.body);

        res.status(201).json(profile);
    } catch (err) {
        console.error(`[Error][${time()}][${__filename}] > ${err.message}`);
        res.status(500).json({ errors: [{msg: err.message}]});
    }
});

router.get('/:id', async (req, res) => {
    try {
        const profile = await show(req.params.id);

        res.status(200).json(profile);
    } catch (err) {
        console.error(`[Error][${time()}][${__filename}] > ${err.message}`);
        res.status(500).json({ errors: [ {msg: err.message} ]});
    }
});

router.put('/:id', auth, async (req, res) => {
    try {
        const profile = await update(req.user.id, req.body);

        res.status(200).json(profile);
    } catch (err) {
        console.error(`[Error][${time()}][${__filename}] > ${err.message}`);
        res.status(500).json({ errors: [ {msg: err.message} ]});
    }
});


router.delete('/:id', auth, async (req, res) => {
    try {
        const profile = await destroy(req.user.id);

        res.status(200).json(profile);
    } catch (err) {
        console.error(`[Error][${time()}][${__filename}] > ${err.message}`);
        res.status(500).json({ errors: [ {msg: err.message} ]});
    }
});

module.exports = router;