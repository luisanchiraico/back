'use strict'
const express = require('express');
const api = express.Router();
const controller = require('../controllers/clients.controller');

api.post('/',controller.addClient);
api.get('/:id', controller.getClient);
api.post('/status/:id',controller.addNewStatus);
api.put('/update-client/:id', controller.updateClient)
api.get('/client-info/sources', controller.getClientSources);
api.get('/client-info/reject-reasons', controller.getClientRejectReasons);
module.exports = api;