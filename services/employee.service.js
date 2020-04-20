'use strict'

const config = require('../bin/config');
const queryService = require('./query.service');

function loginEmployee(dni,password){
    let sentence = `
        SELECT 
            empleado.nrodoc,
            empleado.nombre,
            empleado.ap,
            empleado.am,
            empleado.cargo,
            empleado.estado
        FROM empleado 
        WHERE empleado.nrodoc = '${dni}'
        AND empleado.clave = '${password}'
        AND empleado.cargo IN ('${config.constants.EMPLOYEE.POSITION.SALES_AGENT}','${config.constants.EMPLOYEE.POSITION.SALES_SUPERVISOR}');`
    return queryService.get(sentence);
}

function getEmployee(dni){
    let sentence = `
            SELECT 
            empleado.nrodoc,
            empleado.nombre,
            empleado.ap,
            empleado.am,
            empleado.email,
            empleado.telefono,
            empleado.cargo,
            empleado.estado
        FROM empleado 
        WHERE empleado.nrodoc = '${dni}'
        #AND empleado.estado = '${config.constants.EMPLOYEE.STATUS.ACTIVE}'
        AND empleado.cargo IN ('${config.constants.EMPLOYEE.POSITION.SALES_AGENT}','${config.constants.EMPLOYEE.POSITION.SALES_SUPERVISOR}');`
        return queryService.get(sentence);
}

function getTeam(dni, limit, offset, search){
    let searchBy = ``;
    if(!!search && search != null){
        searchBy = `AND REPLACE(UPPER(CONCAT(IFNULL(empleado.nombre,''),IFNULL(empleado.ap,''),IFNULL(empleado.am,''))),' ','') LIKE UPPER(REPLACE('%${search}%',' ',''))`
    }
    let sentence = `
        SELECT 
            empleado.nrodoc,
            empleado.nombre,
            empleado.ap,
            empleado.am,
            empleado.telefono 
        FROM empleado 
        WHERE empleado.supervisor = '${dni}'
        AND empleado.estado = '${config.constants.EMPLOYEE.STATUS.ACTIVE}'
        AND empleado.cargo IN ('${config.constants.EMPLOYEE.POSITION.SALES_AGENT}') 
        ${searchBy} 
        ORDER BY empleado.nombre ASC
        ${Number.isInteger(Number.parseInt(limit)) ? ` LIMIT ${limit} ` : ` `} ${Number.isInteger(Number.parseInt(offset)) ? ` OFFSET ${offset}` : ` ` }
        ;`
    return queryService.get(sentence);
}

function getEmployeeInfo(dni){
    let sentence = `
    SELECT 
        (
            SELECT 
                COUNT(1) 
            FROM clientes 
            WHERE clientes.empleadoId = empleado.nrodoc
        ) AS clients,
        (
            SELECT 
                SUM(ventas.cantidad)
            FROM ventas
            WHERE ventas.clienteId IN (		
                SELECT 
                    clientes.idclientes 
                FROM clientes 
                WHERE clientes.empleadoId = empleado.nrodoc
            )	
        ) AS products,
        (
            SELECT 
                COUNT(1)
            FROM cliente_estado
            WHERE cliente_estado.clienteId IN (
                SELECT 
                    clientes.idclientes 
                FROM clientes 
                WHERE clientes.empleadoId = empleado.nrodoc
            )
            AND cliente_estado.estadoId = 'E1'
        ) AS negociando,
        (
            SELECT 
                COUNT(1)
            FROM cliente_estado
            WHERE cliente_estado.clienteId IN (
                SELECT 
                    clientes.idclientes 
                FROM clientes 
                WHERE clientes.empleadoId = empleado.nrodoc
            )
            AND cliente_estado.estadoId = 'E2'
        ) AS si_verbal,
        (
            SELECT 
                COUNT(1)
            FROM cliente_estado
            WHERE cliente_estado.clienteId IN (
            SELECT 
                    clientes.idclientes 
                FROM clientes 
                WHERE clientes.empleadoId = empleado.nrodoc
            )
            AND cliente_estado.estadoId = 'E3'
        ) AS instalado
    FROM empleado
    WHERE empleado.nrodoc = '${dni}'
    AND empleado.estado = 'ACTIVO';
    `;
    return queryService.get(sentence);
}

function updateEmployee(dni,data){
    let updData = {
        nombre : data.nombre.toUpperCase(),
        ap: data.ap.toUpperCase(),
        am: data.am.toUpperCase(),
        email: data.email.toUpperCase(),
        telefono: data.telefono
    };

    let sentence = `
        UPDATE empleado
        SET ?
        WHERE empleado.nrodoc = ${dni}
    `;

    return queryService.update(sentence, updData);
    
}

module.exports = {
    loginEmployee,
    getEmployee,
    getTeam,
    getEmployeeInfo,
    updateEmployee
};