// src/setupProxy.js
const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/auth-api",
    createProxyMiddleware({
      target:  `${process.env.REACT_APP_AUTH_API_URL || 'http://localhost:5000'}/api`,
      changeOrigin: true,
      secure: false,
    })
  );

  app.use(
    "/product-api",
    createProxyMiddleware({
      target:  `${process.env.REACT_APP_API_URL || 'http://localhost:5001'}`,
      changeOrigin: true,
      secure: false,
    })
  );

};


