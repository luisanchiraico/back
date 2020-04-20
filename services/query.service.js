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

function insertOne(sentence,body){
    return new Promise((resolve, reject) => {
        db.mysql.master.query(sentence,body,(err,rows)=>{
            if(err) return reject(err);
            return resolve(rows.insertId);
        })
    });
}

function insertMultiple(sentence,body){
    return new Promise((resolve, reject) => {
        db.mysql.master.query(sentence,[body],(err,rows)=>{
            if(err) return reject(err);
            return resolve(rows);
        })
    });
}

function update(sentence,data){
    return new Promise((resolve, reject) => {
        db.mysql.master.query(sentence,data,(err,rows)=>{
            if(err) return reject(err);
            return resolve(rows);
        });
    });
}

function deleteData(sentence){
    return new Promise((resolve, reject) => {
        db.mysql.master.query(sentence,(err,rows)=>{
            if(err) return reject(err);
            return resolve(rows);
        })
    });
}


module.exports = {
    get,
    insertOne,
    insertMultiple,
    update,
    deleteData
}