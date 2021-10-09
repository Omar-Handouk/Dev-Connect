'use strict';

const User = require('../../models/User.model');
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');

/*
 * This function is used for the following:
 * Check that after we verify a token that a supplied userId is valid
 * If it is not valid return an error, else return the decoded token
 * 
*/
const index = async (data) => {
    const { id } = data;

    let user = await User.findById(id, '-password');
    if (!user) {
        return Promise.reject(new Error('User ID not found'));
    }

    return Promise.resolve(data);
}

const create = async (data) => {
    /*
     * Check if email is valid
     * Get user data
     * Check if hashes match
     * return JWT
    */

    try {
        const {email, password} = data;

        let user = await User.findOne({email});
        if (!user) {
            return Promise.reject(new Error('Invalid credentials'));
        }

        const passwordsMatch = bcrypt.compareSync(password, user.password);
        if (!passwordsMatch) {
            return Promise.reject(new Error('Invalid credentials'));
        }

        const token = jwt.sign(
            { user: { id: user.id, email: user.email, avatar: user.avatar }},
            config.get('jwtSecret'),
            {expiresIn: '5 days'});
        
        return Promise.resolve(token);

    } catch (err) {
        return Promise.reject(err.message);
    }
};

module.exports = {
    index,
    create
};