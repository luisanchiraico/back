'use strict'

const express = require('express');
const api = express.Router();
const employee = require('./employee.route');
const products = require('./products.route');
const clients = require('./clients.route');

api.use('/', employee);
api.use('/products',products);
api.use('/clients',clients);

module.exports = api;