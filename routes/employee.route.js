'use strict'

const express = require('express');
const api = express.Router();
const controller = require('../controllers/employee.controller');

api.post('/login',controller.login);
api.get('/get-employee/:dni',controller.getEmployee);
api.get('/get-team-by-employee/:dni',controller.getTeamByEmployee);
api.get('/get-employee-results/:dni', controller.getInfoByEmployee)
api.get('/get-clients/:dni',controller.getClientsByEmployee);
api.put('/update-employee/:dni', controller.updateEmployee);

module.exports = api;