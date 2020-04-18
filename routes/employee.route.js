'use strict'

const express = require('express');
const api = express.Router();
const controller = require('../controllers/employee.controller');

api.get('/test',controller.getEmployees);


module.exports = api;