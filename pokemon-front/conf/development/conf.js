module.exports = {

    application: {
        env: "development",
        log: {
            level: "debug"
        }
    },

    service: {
        protocol: "http",
        host: "localhost",
        port: 3004
    },

    middleware: {
        port: 3000
    }

};