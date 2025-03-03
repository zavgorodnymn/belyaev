const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://localhost:5000',
      changeOrigin: true,
      timeout: 30000,
      pathRewrite: {
        '^/api': '/api'
      },
      onError: (err, req, res) => {
        console.error('Proxy Error:', err);
        res.status(500).send('Proxy Error');
      }
    })
  );
  
  // Добавляем обработку mockServiceWorker.js
  app.use(
    '/mockServiceWorker.js',
    createProxyMiddleware({
      target: 'http://localhost:5000',
      changeOrigin: true,
    })
  );
}; 