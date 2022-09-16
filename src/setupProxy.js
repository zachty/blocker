//for some reason this works but using proxy in the package.json file does not. will need to investigate this more
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(
        '/auth/**',
        createProxyMiddleware({
            target: 'http://localhost:5000',
        })
    );
};
