const webpack = require('webpack');
const proxyMiddleware = require('http-proxy-middleware');
const express = require('express');

const appConf = require('./conf/conf');
const webpackConfig = require('./webpack.' + appConf.application.env + '.config');

const logger = require('./logger/logger');

const app = new (express)();

const options = {
    target: appConf.service.protocol + '://' + appConf.service.host + ':' + appConf.service.port,
    pathRewrite: {
        '^/api/': '/'
    },
    changeOrigin: true,
    logLevel: appConf.middleware.logLevel
};

const proxy = proxyMiddleware(appConf.middleware.context, options);

const compiler = webpack(webpackConfig);

if (appConf.application.env === "development") {
    const webpackDevMiddleware = require('webpack-dev-middleware');
    const webpackHotMiddleware = require('webpack-hot-middleware');

    logger.debug("Development mode: enable hot reloading");

    app.use(webpackDevMiddleware(compiler, {
            noInfo: true,
            publicPath: webpackConfig.output.publicPath
        }
    ));

    app.use(webpackHotMiddleware(compiler));
}

app.use(proxy);
app.use('/static', express.static(__dirname + '/dist'));

app.get(/^((?!\/api).)*$/, function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

logger.info(appConf);

app.listen(appConf.middleware.port, function (error) {
    if (error) {
        logger.error(error);
    } else {
        logger.info("Listening on port %s", appConf.middleware.port);
    }
});