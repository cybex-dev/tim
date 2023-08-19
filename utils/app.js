const express = require('express');
const http = require('http');

const startServer = (port) => {
    let app = express();
    app.set('port', port);
    app.use((req, res, next) => {
        res.header('Access-Control-Allow-Methods', 'GET');
        next();
    });
    app.get('/health', (req, res) => {
        const data = {
            uptime: process.uptime(),
            message: 'Ok',
            date: new Date()
        }

        res.status(200).send(data);
    });

    let server = http.createServer(app);
    server.listen(port);
    server.on('error', (err) => {
        console.error(err);
    });
    server.on('listening', () => {
        console.log(`Server listening on port ${port}`);
    });
    server.on('close', () => {
        console.log('Server closed');
    });
}

const normalizePort = (val) => {
    const port = parseInt(val, 10);

    if (isNaN(port)) {
        // named pipe
        return val;
    }

    if (port >= 0) {
        // port number
        return port;
    }

    return false;
}

module.exports = {
    startServer,
    normalizePort
}
