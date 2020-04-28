'use strict'

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const api = require('./routes');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('', api);

app.use('/health', function (req, res, next) {
    return res.json({status: 'UP'});
});

module.exports = app;