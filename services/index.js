'use strict'


const employees = require('./employee.service');
const products = require('./products.service');
const clients = require('./clients.service');
const validations =  require('./validation.service');
const mailer = require('./mailer.service');

module.exports = {
    employees,
    products,
    clients,
    validations,
    mailer
}