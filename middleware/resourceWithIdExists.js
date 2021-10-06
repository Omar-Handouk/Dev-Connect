'use strict';

const getModel = require('../utils/getModel');

module.exports = (resourceId, resourceName) => async (req, res, next) => {
    
    const resourceModel = getModel(resourceName);
    
    const resource = await resourceModel.findById(req.params[resourceId]);

    if (!resource) {
        return res.status(404).json({ errors: [ { msg: `${resourceName} not found!` } ] });
    }

    next();
}