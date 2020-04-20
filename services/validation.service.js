'use strict'

function isValidString(value){
    return value != null && !!value;
}

function isValidNumber(value){
    return Number.isInteger(Number.parseInt(value))
}

function isValidEmail(value){
    const emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9_-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
    return emailRegex.test(value);
}

function isValidBody(requiredKeys,body){
    const requestKeys = Object.keys(body);
    const hasAnyRequiredKey = requiredKeys.every(val => requestKeys.includes(val));
    return hasAnyRequiredKey;
}

function isValidBodyArray(requiredKeys,bodyArr){
    let hasRequiredKeys = true;
    for(let body of bodyArr){
        let requestKeys = Object.keys(body);
        let hasAnyRequiredKey = requiredKeys.every(val => requestKeys.includes(val));
        if(!hasAnyRequiredKey){
            hasRequiredKeys = hasAnyRequiredKey;
            break;  
        } 
    }
    return hasRequiredKeys;
}

function isValidArray(value) {
    return value != null && !!value && !!value.length;
}

module.exports = {
    isValidString,
    isValidNumber,
    isValidEmail,
    isValidBody,
    isValidArray,
    isValidBodyArray
}