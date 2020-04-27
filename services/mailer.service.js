'use strict'
const config = require('../bin/config');
const sengrid = require('@sendgrid/mail');
sengrid.setApiKey(config.environment.SENGRID_API_KEY);

function sendNewPasswordEmail(name, email, newPassword){
    const msg = {
        to: email,
        from: 'no-reply@masventasapp.com',
        subject: 'Cambio de contraseña',
        html: `<h2>Hola ¡${name}!</h2><p>Has solicitado un cambio de contraseña a tu cuenta de +Ventas</p><p>Tu nueva contraseña es: <strong>${newPassword}</strong></p><p>Recuerda cambiar tu contraseña cuando vuelvas a ingresar a tu app!</p><p>¡Gracias!</p>`,
    };
    sengrid.send(msg);
}

module.exports = {
    sendNewPasswordEmail
}