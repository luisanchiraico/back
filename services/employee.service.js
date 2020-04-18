'use strict'

const config = require('../bin/config');
const queryService = require('./query.service');

function getEmployees(){
    let sentence = `
        SELECT 
            count(1) 
        FROM empleado 
        WHERE empleado.cargo IN ('AGENTE DE VENTAS','SUPERVISOR DE VENTAS');`
        return queryService.get(sentence);
}

module.exports = {
    getEmployees
};