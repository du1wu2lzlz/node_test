/*
    server模块依赖
*/
var http = require('http');
var fs   = require('fs');
http.createServer(function (req, res) {
    res.writeHead(200, {
        'Content-Type': 'text/html'
    });
    res.end('<h1>hello</h1>');
}).listen(3000);

//createServer()回调函数会接收一个对象,该对象是Node中一个很常见的实例:stream
