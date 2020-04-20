'use strict'

const services = require('../services/index');
const config = require('../bin/config');

async function addClient(req,res){
    try {
        const requiredKeys=[
            'nombre',
            'apellido',
            'correo',
            'telefono',
            'ruc',
            'razon_social',
            'empleadoId',
            'products'
        ]
        const body = req.body;
        if(!services.validations.isValidBody(requiredKeys,body)){
            return res.status(400).json({msg:"INVALID.BODY"});
        }

        if(!services.validations.isValidString(body.nombre)){
            return res.status(400).json({msg:"INVALID.NAME"});
        }

        if(!services.validations.isValidString(body.apellido)){
            return res.status(400).json({msg:"INVALID.LASTNAME"});
        }

        if(!services.validations.isValidEmail(body.correo)){
            return res.status(400).json({msg:"INVALID.EMAIL"});
        }

        if(!services.validations.isValidNumber(body.telefono)){
            return res.status(400).json({msg:"INVALID.PHONE"});
        }

        if(!services.validations.isValidNumber(body.ruc)){
            return res.status(400).json({msg:"INVALID.RUC"});
        }

        if(!services.validations.isValidString(body.razon_social)){
            return res.status(400).json({msg:"INVALID.BUSSINESS_NAME"});
        }

        if(!services.validations.isValidArray(body.products)){
            return res.status(400).json({msg:"INVALID.PRODUCTS"});
        }

        let productRequireKeys=[
            'id',
            'cantidad'
        ]
        if(!services.validations.isValidBodyArray(productRequireKeys,body.products)){
            return res.status(400).json({msg:"INVALID.PRODUCTS.BODY"});
        }
        
        let clientId = await services.clients.saveClient(body)
        let agregarEstado = await services.clients.addClientStatus(clientId,config.constants.CLIENTS.STATUS.DEFAUT_STATUS_ID);
        let agregarProductos = await services.products.addProductsToClient(clientId,body.products);
        
        return res.status(200).json({msg:'GLOBAL.OK', clientId: clientId });
    } catch (error) {
        console.error(error);
        res.status(500).json({msg:"GLOBAL.ERROR"});
    }
}

async function getClient(req,res){
    try {
        let { id } = req.params;
        const client = await services.clients.getClient(id);
        return res.status(200).json({...client[0][0], products: client[1] });
    } catch (error) {
        console.error(error);
        res.status(500).json({msg:"GLOBAL.ERROR"});
    }
}

async function addNewStatus(req,res){
    try {
        let { id } = req.params;
        let body = req.body;
        let requiredKeys = [
            'id',
            'codigo'
        ]
        if(!services.validations.isValidBody(requiredKeys,body) || !services.validations.isValidNumber(id)){
            return res.status(400).json({msg:"INVALID.DATA"});
        }

        const saveStatus = await services.clients.addClientStatus(id,body.id,body.codigo);
        return res.status(200).json({msg:'GLOBAL.OK'});
    } catch (error) {
        console.error(error);
        res.status(500).json({msg:"GLOBAL.ERROR"});
    }
}

async function updateClient(req,res){
    try {
        let { id } = req.params;
        const requiredKeys=[
            'nombre',
            'apellido',
            'correo',
            'telefono',
            'ruc',
            'empresa',
            'products'
        ]
        const body = req.body;
        if(!services.validations.isValidBody(requiredKeys,body)){
            return res.status(400).json({msg:"INVALID.BODY"});
        }

        if(!services.validations.isValidString(body.nombre)){
            return res.status(400).json({msg:"INVALID.NAME"});
        }

        if(!services.validations.isValidString(body.apellido)){
            return res.status(400).json({msg:"INVALID.LASTNAME"});
        }

        if(!services.validations.isValidEmail(body.correo)){
            return res.status(400).json({msg:"INVALID.EMAIL"});
        }

        if(!services.validations.isValidNumber(body.telefono)){
            return res.status(400).json({msg:"INVALID.PHONE"});
        }

        if(!services.validations.isValidNumber(body.ruc)){
            return res.status(400).json({msg:"INVALID.RUC"});
        }

        if(!services.validations.isValidString(body.empresa)){
            return res.status(400).json({msg:"INVALID.BUSSINESS_NAME"});
        }

        if(!services.validations.isValidArray(body.products)){
            return res.status(400).json({msg:"INVALID.PRODUCTS"});
        }

        let productRequireKeys=[
            'id',
            'cantidad'
        ]
        if(!services.validations.isValidBodyArray(productRequireKeys,body.products)){
            return res.status(400).json({msg:"INVALID.PRODUCTS.BODY"});
        }
        


        let clientId = await services.clients.updateClient(id,body);
        let cleanProducts = await services.products.cleanProducts(id);
        let agregarProductos = await services.products.addProductsToClient(id,body.products);
        return res.status(200).json({msg:'GLOBAL.OK'});
    } catch (error) {
        console.error(error);
        res.status(500).json({msg:"GLOBAL.ERROR"});
    }   
}


module.exports = {
    addClient,
    getClient,
    addNewStatus,
    updateClient
}