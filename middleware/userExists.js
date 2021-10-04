'use strict';

const User = require('../models/User.model');

module.exports = (userId) => async (req, res, next) => {
    
    const user = await User.findById(req.params[userId]);
    if (!user) {
        return res.status(400).json({ errors: [ { msg: 'User does not exist'} ]});
    }

    next();
};