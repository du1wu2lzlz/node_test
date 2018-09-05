/*
    server模块依赖
    node-mysql模块依赖
*/
var express = require('express');
var mysql = require('mysql');
var config = require('./config.json');

/*
   创建应用
*/
app = express.createServer();
/*
   配置应用
*/
app.set('view engine', 'jade');
app.set('views', __dirname + '/views');
app.set('view options', {layout: false});
/*
   首页路由
*/
app.get('/', function (req, res, next) {
        res.render('index');
});
/*
   创建商品路由
*/
app.post('/create', function (req, res, next ) {    
});
/*
   查看商品路由
*/
app.get('/item/:id', function (req, res, next) {
        res.render('item');
})
/*
   创建商品评价路由
*/
app.post('/item/:id/review', function (req, res, next) {
});
/*
   监听端口
*/
app.listen('3030', function(){
    console.log('正在监听3030端口');
})
/*
    连接MySQL
*/
var db = mysql.createClient(config);

