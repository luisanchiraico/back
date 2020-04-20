'use strict'
const config = require('../bin/config');
const queryService = require('./query.service');

function getProducts(){
    let sentence = `
        SELECT 
            mantenimiento_pokets.idmantenimiento_pokets,
            mantenimiento_pokets.tipo 
        FROM mantenimiento_pokets
        WHERE mantenimiento_pokets.estado = '${config.constants.PRODUCTS.STATUS.ACTIVE}'
    `;
    return queryService.get(sentence);
}

function addProductsToClient(clientId, products){
    let sentence = ` INSERT INTO ventas(clienteId,IdmantenimientoPoket,cantidad) VALUES ? `;
    let body = products.map(e=>[clientId,e.id,e.cantidad]);
    return queryService.insertMultiple(sentence,body);
}

function cleanProducts(clientId){
    let sentence = `
        DELETE FROM ventas 
        WHERE ventas.clienteId = ${clientId};    
    `;
    return queryService.deleteData(sentence);
}

module.exports = {
    getProducts,
    addProductsToClient,
    cleanProducts
};