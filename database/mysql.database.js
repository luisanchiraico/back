'use strict'

const mysql = require('mysql');
const env = require('./../bin/environment');

const poolCluster = mysql.createPoolCluster();
poolCluster.add("MASTER", env.DB);

module.exports ={
    master: poolCluster.of('MASTER')
};