'use strict'

const db = require('../database');

function get(sentence){
    return new Promise((resolve, reject) => {
        db.mysql.master.query(sentence,(err,rows)=>{
            if(err) return reject(err);
            return resolve(rows);
        })
    });
}

module.exports = {
    get
}