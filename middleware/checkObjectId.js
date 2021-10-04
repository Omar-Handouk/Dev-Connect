'use strict';

const mongoose = require('mongoose');

module.exports = (idKey) => (req, res, next) => {
    if (!mongoose.Types.ObjectId.isValid(req.params[idKey])) {
        return res.status(400).json({ errors: [ {msg: 'Invalid User ID'} ]});
    }

    next();
};