'use strict';

const mongoose = require('mongoose');
const config   = require('config');
const time     = require('../utils/time');

const mongoURI = config.get('db.cluster');
const mongoOptions = config.get('db.options');

const connectDB = async () => {
    try {
        await mongoose.connect(mongoURI, mongoOptions);
        console.info(`[info][${time()}] > Connected to database!`)
    } catch (e) {
        console.error(`[error][${time()}][${__filename}] > Could not connect to database\n${e.message}`);
        process.exit(1);
    }
}

module.exports = {connectDB};