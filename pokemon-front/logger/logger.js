const winston = require('winston');
const conf = require('../conf/conf');
const fs = require('fs');

const logDir = 'logs';

if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir);
}

var logger = new winston.Logger({
    level: conf.application.log.level,
    transports: [
        new (winston.transports.Console)(),
        new (winston.transports.File)(
            {
                name: 'logger',
                filename: './' + logDir + '/server.log'
            }
        )
    ]
});

logger.exitOnError = false;

module.exports = logger;