'use strict'

const config = require('../bin/config');
const services = require('../services/index');

async function login(req,res){
    try {
        const body = req.body;
        const requiredKeys =[
            'dni',
            'password'
        ]
        if(!services.validations.isValidBody(requiredKeys,body)){
            return res.status(400).json({msg:"INVALID.BODY"});
        }
        if(!services.validations.isValidNumber(body.dni)){
            return res.status(400).json({msg:"INVALID.DNI"});
        }
        if(!services.validations.isValidNumber(body.password)){
            return res.status(400).json({msg:"INVALID.PASSWORD"});
        }
        const data = await services.employees.loginEmployee(body.dni,body.password);
        if(!data.length){
            return res.status(400).json({msg:"USER.NOT.FOUND"});
        }
        if(data[0].estado != config.constants.EMPLOYEE.STATUS.ACTIVE){
            return res.status(400).json({msg:"USER.INACTIVE"});
        }
        return res.status(200).json(data[0]);
    } catch (error) {
        console.error(error);
        return res.status(500).json({msg:"GLOBAL.ERROR"});
    }
}

async function getEmployee(req,res){
    try {
        const { dni } = req.params;
        const data = await services.employees.getEmployee(dni);
        if(!data.length){
            return res.status(400).json({msg:"USER.NOT.FOUND"});
        }

        if(data[0].estado != config.constants.EMPLOYEE.STATUS.ACTIVE){
            return res.status(400).json({msg:"USER.INACTIVE"});
        }

        return res.status(200).json(data[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({msg:"GLOBAL.ERROR"});   
    }
}

async function getTeamByEmployee(req,res){
    try {
        const { dni } = req.params;
        const { limit, offset, search } = req.query;
        const data = await services.employees.getTeam(dni, limit, offset, search);
        return res.status(200).json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({msg:"GLOBAL.ERROR"});   
    }
}

async function getInfoByEmployee(req,res){
    try {
        const { dni } = req.params;
        const data = await services.employees.getEmployeeInfo(dni);
        if(!!data.length){
            return res.status(200).json(data[0]);
        }
        return res.status(400).json({msg:"USER.NOT.FOUND"});
    } catch (error) {
        console.error(error);
        res.status(500).json({msg:"GLOBAL.ERROR"});   
    }
}


async function getClientsByEmployee(req,res){
    try {
        const { dni } = req.params;
        const { limit, offset, search, type } = req.query;
        //validations require
        const data = await services.clients.getClientsByEmployee(dni,limit,offset, search, type);
        return res.status(200).json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({msg:"GLOBAL.ERROR"});   
    }
}

async function updateEmployee(req,res){
    try {
        const { dni } = req.params;
        const body = req.body;

        const requiredKeys=[
            'nombre',
            'ap',
            'am',
            'email',
            'telefono'
        ]
        
        if(!services.validations.isValidBody(requiredKeys,body)){
            return res.status(400).json({msg:"INVALID.BODY"});
        }

        if(!services.validations.isValidString(body.nombre)){
            return res.status(400).json({msg:"INVALID.NAME"});
        }

        if(!services.validations.isValidString(body.ap)){
            return res.status(400).json({msg:"INVALID.AP"});
        }

        if(!services.validations.isValidString(body.am)){
            return res.status(400).json({msg:"INVALID.AM"});
        }

        if(!services.validations.isValidEmail(body.email)){
            return res.status(400).json({msg:"INVALID.EMAIL"});
        }

        if(!services.validations.isValidNumber(body.telefono)){
            return res.status(400).json({msg:"INVALID.PHONE"});
        }

        const data = await services.employees.updateEmployee(dni,body)
        return res.status(200).json({msg:"GLOBAL.OK"});
    } catch (error) {
        console.error(error);
        res.status(500).json({msg:"GLOBAL.ERROR"});   
    }
}

module.exports = {
    login,
    getEmployee,
    getTeamByEmployee,
    getInfoByEmployee,
    getClientsByEmployee,
    updateEmployee
}