const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/osm',
    createProxyMiddleware({
      target: 'https://nominatim.openstreetmap.org/search',
      changeOrigin: true,
    })
  );
};
