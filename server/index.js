/* eslint-disable no-console */
const logger = require('./logger');
const app = require('./app');
const port = app.get('port');
const server = app.listen(port);
const https = require('https');
const fs = require('fs');
/*
var privateKey = fs.readFileSync(__dirname + '/config/incyte.key', 'utf8');
var certificate = fs.readFileSync(__dirname + '/config/incyte.cert', 'utf8');

const httpsServer = https.createServer({
  cert: certificate,
  key: privateKey
}, app); 

const serverHttps = httpsServer.listen(port);

app.setup(serverHttps);*/

process.on('unhandledRejection', (reason, p) =>
  logger.error('Unhandled Rejection at: Promise ', p, reason)
);

server.on('listening', () =>
  logger.info('Feathers application started on http://%s:%d', app.get('host'), port)
);
