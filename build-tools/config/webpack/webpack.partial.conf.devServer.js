const path = require('path');
const fs = require('fs');
const express = require('express');

const projectRoot = path.resolve(__dirname, '../../../');

module.exports = ({ config }) => webpackConfig => ({
  ...webpackConfig,
  devServer: {
    clientLogLevel: 'info',
    noInfo: true,
    hotOnly: true,
    open: false,
    overlay: {
      warnings: false,
      errors: true,
    },
    compress: true,
    contentBase: config.staticPath,
    publicPath: '/',
    disableHostCheck: true,
    host: process.env.HOST || '0.0.0.0',
    port: config.devServer.port,
    proxy: config.devServer.proxyTable,
    before(app) {
      app.use('/' + config.proxyAssetPath, express.static(config.assetPath));

      // render basic default index.html for all html files (path will be picked by JS)
      app.use((req, res, next) => {
        if (req.path.includes('.html')) {
          res.send(fs.readFileSync(path.resolve(config.projectRoot, 'build-tools/templates/devserver-index.html'), 'utf-8').replace('{{aemPath}}', `${config.aemSharedPath}js/`));
        } else {
          next();
        }
      });

      // also render index.html on /
      app.get('/', function(req, res) {
        res.send(fs.readFileSync(path.resolve(config.projectRoot, 'build-tools/templates/devserver-index.html'), 'utf-8').replace('{{aemPath}}', `${config.aemSharedPath}js/`));
      });
    },
    https: config.devServer.useHttps
  },
});
