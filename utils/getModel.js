'use strict';

const User = require('../models/User.model');
const Profile = require('../models/Profile.model');
const Post = require('../models/Post.model');

const models = {
    user: User,
    profile: Profile,
    post: Post
};

module.exports = (modelName) => {
    return models[modelName.toLowerCase().trim()];
};