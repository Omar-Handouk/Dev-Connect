'use strict';

require('dotenv').config();

module.exports = {
    db: {
        cluster: 'mongodb+srv://development.mnwiy.mongodb.net/',
        options: {
            user: process.env.DB_USER,
            pass: process.env.DB_PASS,
            dbName: 'dev'
        }
    }
}