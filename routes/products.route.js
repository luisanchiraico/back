'use strict'
const express = require('express');
const api = express.Router();
const controller = require('../controllers/products.controller');

api.get('/',controller.getProducts);

module.exports = api;