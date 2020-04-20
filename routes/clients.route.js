'use strict'
const express = require('express');
const api = express.Router();
const controller = require('../controllers/clients.controller');

api.post('/',controller.addClient);
api.get('/:id', controller.getClient);
api.post('/status/:id',controller.addNewStatus);
api.put('/update-client/:id', controller.updateClient)
module.exports = api;