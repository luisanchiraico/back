'use strict'

const app = require('../app');
const config = require('./config');
var http = require('http');
var port = (config.environment.PORT);
app.set('port', port);
var server = http.createServer(app);
server.listen(port);

// app.listen(config.environment.PORT, () => {
//     console.log(`API REST corriendo en http://localhost:${config.environment.PORT}`);
// });