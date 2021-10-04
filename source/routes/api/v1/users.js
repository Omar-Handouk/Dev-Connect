'use strict';

const router = require('express').Router();
const { body, validationResult } = require('express-validator');
const { index, create, show, update } = require('../../../services/users-service');
const checkObjectId = require('../../../../middleware/checkObjectId');
const validation = require('../../../../validations/user.validation');
const auth = require('../../../../middleware/authVerf');
const userExists = require('../../../../middleware/userExists');
const time = require('../../../../utils/time');

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

router.get('/:id', checkObjectId('id'), userExists('id'), async (req, res) => {
    try {
        const user = await show(req.params.id);
    
        res.status(200).json(user)
    } catch (err) {
        console.error(`[Error][${time()}][${__filename}] > ${err.message}`);
        res.status(400).json({ errors: [ { msg: err.message } ]});
    }
});

router.put('/:id',
    auth,
    checkObjectId('id'),
    userExists('id'),
    body('avatar', 'Avatar field is not allowed').isEmpty(),
    body('date', 'Date field is not allowed').isEmpty(), async (req, res) => {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        if (Object.keys(req.body).length === 0) {
            return res.status(400).json({ errors: [ { msg: 'No information provided' } ] });
        }

        try {
            const token = await update(req.params.id, req.body);

            res.status(200).json({ jwt: token });
        } catch (err) {
            console.error(`[Error][${time()}][${__filename}] > ${err.message}`);
            res.status(400).json({ errors: [ { msg: err.message } ]});
        }
});

module.exports = router;