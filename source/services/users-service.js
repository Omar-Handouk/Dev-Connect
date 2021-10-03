'use strict';

const User = require('../../models/User.model');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require ('jsonwebtoken');


const index = async () => {
    return (await User.find({}));
};

const create = async (data) => {
    /*
    * Check If User e-mail exists
    * Form Gravatar URL
    * Use Bcrypt to hash password
    * Save details in DB
    * Return JWT
    */

    try {
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

    } catch (err) {
        return Promise.reject(err.message);
    }
};

const show = async (userId) => {
    return (await User.findById(userId));
};

const update = async (userId, data) => {};

const destroy = async (userId) => {};

module.exports = {
    index,
    create,
    show,
    update,
    destroy
};