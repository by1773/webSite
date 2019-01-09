var NODE_ENV = process.env.NODE_ENV || 'release';
var conf = {
    devServerHost: '192.168.1.158', // 本地访问地址
    devServerPort: 8005,

    path: __dirname + '/dist/', // 本地打包路径
    resourcePath: NODE_ENV === 'release' ? '//127.0.0.1:8007/' : '/dist/', // 资源访问路径

    debug: NODE_ENV !== 'release',
    release: NODE_ENV === 'release',

    serverBaseUrl: 'http://47.107.63.71:8080' // 服务端地址
};
module.exports = conf;