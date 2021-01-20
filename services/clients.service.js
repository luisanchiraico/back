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
        empleadoId: data.empleadoId,
        tipo_ruc: data.tipo_ruc,
        fuente_cliente_id:  data.fuente_cliente_id,
        dni: data.dni
    };
    let sentence = `
        INSERT INTO clientes SET ?
    `;
    return queryService.insertOne(sentence,insertData);
}

function addClientStatus(clientId, statusId, codigo, nro_pedido, reasonId, comment){
    const insertData = {
        clienteId : clientId,
        estadoId : statusId,
        codigo : !!codigo ? codigo : null,
        nro_pedido ,
        rechazo_motivoId:reasonId,
        comentario_rechazo: comment
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
    if(!!status && status!='0'){
        typeStatus = `HAVING \`estado\` LIKE 'E${status}'`;
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
    const sentence = `
    SELECT 
        c.idclientes,
        c.nombre,
        c.apellido,
        c.telefono,
        c.empresa,
        c.ruc,
        c.dni,
        c.tipo_ruc,
        c.correo,
        ce.estadoId as 'estado',
        ce.rechazo_motivoId,
        mr.nombre as 'motivo_rechazo',
        ce.comentario_rechazo as comentario_rechazo,
        fc.nombre as fuente,
        fc.idfuente_cliente
    FROM clientes c
    LEFT JOIN cliente_estado ce ON c.idclientes = ce.clienteId
    LEFT JOIN motivo_rechazo mr ON mr.idmotivo_rechazo = ce.rechazo_motivoId
    LEFT JOIN estado e ON e.idestado = ce.estadoId
    LEFT JOIN fuente_cliente fc ON fc.idfuente_cliente = c.fuente_cliente_id
    WHERE c.idclientes = ${id}
	 ORDER BY ce.fecha DESC
    LIMIT 1;

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
        ruc: data.ruc,
        tipo_ruc: data.tipo_ruc,
        fuente_cliente_id:  data.fuente_cliente_id,
        dni: data.dni

    };
    let sentence = `
        UPDATE clientes
        SET ?
        WHERE clientes.idclientes = ${id};
    `;
    return queryService.update(sentence,body);
}

function getClientSources(){
    return queryService.get(`SELECT * FROM fuente_cliente;`);
}

function getRejectReasons(){
    return queryService.get(`SELECT * FROM motivo_rechazo;`);
}

module.exports = {
    saveClient,
    addClientStatus,
    getClientsByEmployee,
    getClient,
    updateClient,
    getClientSources,
    getRejectReasons
};