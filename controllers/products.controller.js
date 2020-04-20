'use strict'

const services = require('../services/index');

async function getProducts(req,res){
    try {
        let products = await services.products.getProducts();
        return res.status(200).json(products);
    } catch (error) {
        console.error(error);
        res.status(500).json({msg:"GLOBAL.ERROR"});
    }
}


module.exports = {
    getProducts
}