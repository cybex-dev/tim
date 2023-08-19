const net = require('node:net');

const startServer = (port) => {
    const server = net.createServer((c) => {
        // 'connection' listener.
        console.log('client connected');
        c.on('end', () => {
            console.log('client disconnected');
        });
        c.write('hello\r\n');
        c.pipe(c);
    });
    server.listen(port)
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
