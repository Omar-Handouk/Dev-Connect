'use strict';

const router = require('express').Router();
const validation = require('../../../../validations/user.validation');
const { validationResult } = require('express-validator');
const { index, create, show, update, destroy } = require('../../../services/users-service');

router.get('/', async (req, res) => {
    try {
        const users = await index();

        res.status(200).json(users);
    } catch (err) {
        console.error(`[Error][${time()}][${__filename}] > ${err.message}`);
        res.status(400).json({ errors: [ { msg: err.message } ]});
    }
});

router.post('/', validation, async (req, res) => {

    const errors = validationResult(req);
    
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const token = await create(req.body);

        res.status(201).json({jwt: token});
    } catch (err) {
        console.error(`[Error][${time()}][${__filename}] > ${err.message}`);
        return res.status(400).json({ errors: [ {msg: err.message} ]});
    }
});

router.get('/:id', async (req, res) => {
    try {
        const user = await show(req.params.id);
    
        res.status(200).json(user)
    } catch (err) {
        console.error(`[Error][${time()}][${__filename}] > ${err.message}`);
        res.status(400).json({ errors: [ { msg: err.message } ]});
    }
});

router.put('/:id', async (req, res) => res.send('Update user'));

router.patch('/:id', async (req, res) => res.send('Patch user'));

router.delete('/:id', async (req, res) => res.send('Delete User'));

module.exports = router;