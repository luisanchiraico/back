'use strict'

const express = require('express');
const api = express.Router();
const employee = require('./employee.route');

api.use('/', employee);

module.exports = api;