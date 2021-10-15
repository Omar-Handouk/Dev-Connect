'use strict';

const express = require('express');
const helmet  = require('helmet');
const morgan  = require('morgan');
const path = require('path');

const { connectDB } = require('../config/db');
const time = require('../utils/time');
const app = express();

// Default connection to database
connectDB();

/*----------ENV VARS----------*/
const PORT = process.env.PORT || 3000;
const ENV = process.env.NODE_ENV || 'dev';

/*----------MIDDLEWARE----------*/
app.use(helmet());
app.use(morgan(ENV === 'dev' ? 'dev' : 'common'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// Routes
require('./routes/api/v1/index')(app);

if (ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'client', 'build')));

    app.get('*', (_req, res) => res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html')));
}

app.listen(PORT, () => console.info(`[info][${time()}] > Server is running on http://localhost:${PORT}`));