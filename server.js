const Hapi = require('hapi');
const route = require('./route');
const Server = new Hapi.Server();

Server.connection({ port: 8000, host: '0.0.0.0' })


Server.route(route)


Server.start(err => {
    if (err) {
        throw err;
    }
    console.log(`server running at ${Server.info.uri}`)
})