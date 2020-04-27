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

api.post('/recovery-password/:dni',controller.requestRecoveryPassword);
api.put('/update-password/:dni',controller.changePassword);
module.exports = api;