'use strict';

const router = require('express').Router();
const service = require('../../../services/users-service');
const validation = require('../../../../validations/user.validation');
const { validationResult } = require('express-validator');

router.get('/', async (req, res) => res.send('Get all users'));

router.post('/', validation, async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    res.send('Create user');
});

router.get('/:id', async (req, res) => res.send('Get user'));

router.put('/:id', async (req, res) => res.send('Update user'));

router.patch('/:id', async (req, res) => res.send('Patch user'));

router.delete('/:id', async (req, res) => res.send('Delete User'));

module.exports = router;