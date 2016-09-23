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
        port: 9000
    },

    middleware: {
        port: 3000
    }

};