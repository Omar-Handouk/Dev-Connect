'use strict';

const User = require('../../models/User.model');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require ('jsonwebtoken');


const index = async () => await User.find({}).select('-password');

const create = async (data) => {
    /*
    * Check If User e-mail exists
    * Form Gravatar URL
    * Use Bcrypt to hash password
    * Save details in DB
    * Return JWT
    */
        const { name, email, password } = data;

        let user = await User.findOne({email});

        if (user) {
            return Promise.reject(new Error('User already exists'));
        }

        const avatar = gravatar.url(email, {size: 200, rating: 'pg', default: 'identicon'});

        const hash = bcrypt.hashSync(password, 10);

        user = {
            name,
            email,
            password: hash,
            avatar
        };

        const res = await User.create(user);

        const token = jwt.sign({ user: { id: res.id, email, avatar }}, config.get('jwtSecret'), {expiresIn: '5 days'});

        return Promise.resolve(token);
};

const show = async (userId) => {
    const user = await User.findById(userId).select('-password');
    if (!user) {
        return Promise.reject(new Error('User ID not found'));
    }

    return Promise.resolve(user);
};

const update = async (userId, data) => {
    const { name, email, password } = data;

    const mutation = {};

    if (name) {
        mutation.name = name;
    }

    if (email) {
        let user = await User.findOne({ email });
        if (user) {
            return Promise.reject(new Error('E-mail already exists'));
        }

        mutation.email = email;
        mutation.avatar = gravatar.url(email, {size: 200, rating: 'pg', default: 'identicon'});
    }

    if (password) {
        mutation.password = bcrypt.hashSync(password, 10);
    }

    const user = await User.findByIdAndUpdate(userId, mutation, {new: true, upsert: true, setDefaultsOnInsert: true});
    
    const token = jwt.sign({ user: { id: user.id, email: user.email, avatar: user.avatar } }, config.get('jwtSecret'), {expiresIn: '5 days'});

    return Promise.resolve(token);
};

module.exports = {
    index,
    create,
    show,
    update
};