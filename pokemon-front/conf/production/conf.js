module.exports = {

    application: {
        env: "production",
        log: {
            level: "info"
        }
    },

    service: {
        protocol: "http",
        host: "localhost",
        port: 9000
    },

    middleware: {
        port: 8080
    }

};