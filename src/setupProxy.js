// src/setupProxy.js
const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api", // The path you want to proxy (you can change this to any path you prefer)
    createProxyMiddleware({
      target: "https://language-learning-game-backend.rishavkumaraug20005212.workers.dev", // Your API's URL
      changeOrigin: true,
    })
  );
};
