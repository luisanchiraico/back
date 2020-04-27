'use strict'
const config = require('../bin/config');
const queryService = require('./query.service');

function saveClient(data){
    const insertData = {
        nombre : data.nombre.toUpperCase(),
        apellido: data.apellido.toUpperCase(),
        correo: data.correo.toUpperCase(),
        telefono: data.telefono,
        empresa: data.razon_social.toUpperCase(),
        ruc: data.ruc,
        empleadoId: data.empleadoId
    };
    let sentence = `
        INSERT INTO clientes SET ?
    `;
    return queryService.insertOne(sentence,insertData);
}

function addClientStatus(clientId, statusId, codigo){
    const insertData = {
        clienteId : clientId,
        estadoId : statusId,
        codigo : !!codigo ? codigo : null
    };
    let sentence = `
        INSERT INTO cliente_estado SET ?
    `;
    return queryService.insertOne(sentence,insertData);
}

function getClientsByEmployee(dni, limit, offset, search, status){
    let searchBy = ``;
    if(!!search && search != null){
        searchBy = `AND REPLACE(UPPER(CONCAT(IFNULL(clientes.nombre,''),IFNULL(clientes.apellido,''))),' ','') LIKE UPPER(REPLACE('%${search}%',' ',''))`
    }

    let typeStatus = ``;
    if(!!status && status!= null && status!='0'){
        switch (status) {
            case '1': 
            typeStatus = `HAVING \`estado\` LIKE 'E1'`;
                break;
            case '2': 
            typeStatus = `HAVING \`estado\` LIKE 'E2'`;
                break;
            case '3': 
            typeStatus = `HAVING \`estado\` LIKE 'E3'`;
                break;
        }
    }
    let sentence = `
    SELECT 
        clientes.idclientes,
        clientes.nombre,
        clientes.apellido,
        clientes.telefono,
        clientes.empresa,
        (
            SELECT 
                cliente_estado.estadoId 
            FROM cliente_estado
            WHERE cliente_estado.clienteId = clientes.idclientes
            ORDER BY cliente_estado.fecha DESC
            LIMIT 1
        ) AS estado
    FROM clientes
    WHERE clientes.empleadoId = '${dni}'
    ${searchBy} 
    ${typeStatus}
    ORDER BY clientes.fecha DESC
    ${Number.isInteger(Number.parseInt(limit)) ? ` LIMIT ${limit} ` : ` `} ${Number.isInteger(Number.parseInt(offset)) ? ` OFFSET ${offset}` : ` ` }
    `;
    return queryService.get(sentence);
}

function getClient(id){
    let sentence = `
    SELECT 
        clientes.idclientes,
        clientes.nombre,
        clientes.apellido,
        clientes.telefono,
        clientes.empresa,
        clientes.ruc,
        clientes.correo,
        (
            SELECT 
                cliente_estado.estadoId 
            FROM cliente_estado
            WHERE cliente_estado.clienteId = clientes.idclientes
            ORDER BY cliente_estado.fecha DESC
            LIMIT 1
        ) AS estado
    FROM clientes
    WHERE clientes.idclientes = ${id};

    SELECT
        mantenimiento_pokets.idmantenimiento_pokets AS id,
        mantenimiento_pokets.tipo AS nombre,
        ventas.cantidad
    FROM ventas
    INNER JOIN mantenimiento_pokets 
        ON ventas.IdmantenimientoPoket = mantenimiento_pokets.idmantenimiento_pokets
    WHERE ventas.clienteId = ${id};
    `;
    return queryService.get(sentence);
}

function updateClient(id,data){
    let body = {
        nombre: data.nombre.toUpperCase(),
        apellido: data.apellido.toUpperCase(),
        correo: data.correo.toUpperCase(),
        telefono: data.telefono,
        empresa: data.empresa.toUpperCase(),
        ruc: data.ruc
    };
    let sentence = `
        UPDATE clientes
        SET ?
        WHERE clientes.idclientes = ${id};
    `;
    return queryService.update(sentence,body);
}

module.exports = {
    saveClient,
    addClientStatus,
    getClientsByEmployee,
    getClient,
    updateClient
};