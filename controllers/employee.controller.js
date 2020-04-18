'use strict'

const config = require('../bin/config');
const services = require('../services/index');

async function getEmployees(req,res){
    try {
        const data = await services.employees.getEmployees();
        console.log(data);
        return res.status(200).json({msg:"OK"})
    } catch (error) {
        console.error(error);
        res.status(400).json({msg:"Error"})   
    }
}

module.exports = {
    getEmployees
}