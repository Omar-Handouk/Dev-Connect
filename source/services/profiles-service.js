'use strict';

const Profile = require('../../models/Profile.model');
const User = require('../../models/User.model');
const normalizeUrl = require('normalize-url');


const index = async () => await Profile.find({}).populate('user', ['name', 'avatar']);

const create = async (userId, data) => {

    const {
        website,
        skills,
        youtube,
        twitter,
        instagram,
        linkedin,
        facebook,
        ...rest
    } = data;

    const profile = {
        user: userId,
        website: website && website !== '' ? normalizeUrl(website, {forceHttps: true}) : '',
        skills: skills && Array.isArray(skills) ? skills : skills.split(',').map(skill => skill.trim()),
        ...rest
    }

    const social = {youtube, twitter, instagram, linkedin, facebook};

    for (const [key, value] of Object.entries(social)) {
        if (value && value.length > 0) {
            social[key] = normalizeUrl(value, {forceHttps: true});
        }
    }

    profile.social = social;

    const savedProfile = await Profile.findOneAndUpdate({user: userId}, {$set: profile}, {new: true, upsert: true, setDefaultsOnInsert: true});

    return Promise.resolve(savedProfile);
};

const show = async (userId) => {
    const profile = await Profile.findOne({ user: userId }).populate('user', ['name', 'avatar']);
    if (!profile) {
        return Promise.reject(new Error('User profile not found'));
    }

    return Promise.resolve(profile);
};

const update = async (userId, data) => {
    const profile = await Profile.findOneAndUpdate({ user: userId }, data, {new: true});

    return Promise.resolve(profile);
};

const destroy = async (userId) => {
    await Profile.findOneAndDelete({ user: userId });
    await User.findOneAndDelete({ _id: userId});

    return Promise.resolve({ info: 'User data has been successfully deleted'});
};

module.exports = {
    index,
    create,
    show,
    update,
    destroy
};