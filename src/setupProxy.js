const { createProxyMiddleware } = require('http-proxy-middleware');

const EMPLOYEE_API_ENDPOINT = process.env.REACT_APP_EMPLOYEE_API_ENDPOINT;

module.exports = function (app) {
  app.use(
    '/Employee',
    createProxyMiddleware({
      target: EMPLOYEE_API_ENDPOINT,
      changeOrigin: true,
    }),
  );
};
