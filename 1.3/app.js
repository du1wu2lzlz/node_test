var express = require('express');
var port = process.env.PORT || 3000;
var app = express();
var path = require('path')
// app.use(bodyParser.json()); // for parsing application/json

app.set('views', './views/pages'); //视图的路径，即后面index,admin,list,detail的文件位置
app.set('view engine', 'jade'); //模板引擎
app.use(express.static(path.join(__dirname,'public')))  //静态文件的路径
app.listen(port);

console.log('test started at port' + port);

// index page
app.get('/', function (req, res) {
    res.render('index', {
        title: '首页',
        movies:  [
                { 
                	title:"机械战警",
                	_id:1,
                	poster:"http://r3.ykimg.com/05160000530EEB63675839160D0B79D5"
      
                },
                {
                  title:"X战警",
                	_id:2,
                	poster:"http://r3.ykimg.com/05160000530EEB63675839160D0B79D5"
                },
                {
                	title:"皇家骑士",
                	_id:3,
                	poster:"http://r3.ykimg.com/05160000530EEB63675839160D0B79D5"
      
                }
      
               ]
    })
});

//detail page
app.get('/movie/:id', function (req, res) {
    res.render('detail', {
        title: '详情页'
    })
});

//admin page
app.get('/admin/movie', function (req, res) {
    res.render('admin', {
        title: '后台'
    })
});

//list page
app.get('/admin/list', function (req, res) {
    res.render('list', {
        title: '列表'
    })
});