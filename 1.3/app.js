var express=require('express')
var app = express()
var path = require('path')
var mongoose = require('mongoose')
var Movie = require("./models/movie.js")
var port = process.env.PORT || 3000
var _ = require("underscore")
mongoose.connect('mongodb://localhost/movie')

var bodyParser = require('body-parser');
 
app.use(bodyParser.json()); // for parsing application/json
 
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
//http://www.expressjs.com.cn/guide/using-template-engines.html
//在 Express 中使用模板引擎
// 需要在应用中进行如下设置才能让 Express 渲染模板文件：
// views, 放模板文件的目录，比如： app.set('views', './views')
// view engine, 模板引擎，比如： app.set('view engine', 'jade')
app.set('views','./views/pages')   //视图的路径，即后面index,admin,list,detail的文件位置
app.set('view engine','jade')   //模板引擎
app.use(express.static(path.join(__dirname,'public')))  //静态文件的路径
app.locals.moment=require('moment')
app.listen(port)

console.log("server running at "+port)

// index page
// 首页查询
app.get('/',function(req,res){
    Movie.fetch(function(err,movies){
        if(err){
            console.log(err)
         }
        res.render('index',{
          title:'iggy 首页',
          movies:movies
        })

    })
})

// detaul page
app.get('/movie/:id',function(req,res){
     var id=req.params.id  //url中的id
     Movie.findById(id,function(err,movie){
     res.render('detail',{
        title:'iggy '+movie.title,
        movie:movie
      })
     })
})

//admin update movie
app.get('/admin/update/:id',function(req,res){
   var id = req.params.id
   if(id){
      Movie.findById(id,function(err,movie){
        res.render('admin',{
            title:'imooc 后台更新页',
            movie:movie
        })
      })
   }

})

//admin post method
app.post('/admin/movie/new',function(req,res){
    var id = req.body.movie._id
    var movieObj = req.body.movie
    console.log("ha")
    var _movie =null
    if(id !== 'undefined'){
        //该数据已存到数据库,进行更新
        Movie.findById(id,function(err,movie){
            if(err){
                console.log(err)
            }
            _movie=_.extend(movie,movieObj)
            _movie.save(function(err,movie){
                if (err) {
                    console.log(err)
                }

                res.redirect('/movie/'+movie._id)
            })
            
        })
    }

    else{
        //数据库没有时
        _movie = new Movie({
              doctor:movieObj.doctor,
              title:movieObj.title,
              country:movieObj.country, 
              language:movieObj.language,
              year:movieObj.year,
              poster:movieObj.poster, 
              summary:movieObj.summary,
              flash:movieObj.flash      
        })
        _movie.save(function(err,movie){
                if (err) {
                    console.log(err)
                }

                res.redirect('/movie/'+movie._id)
            })
    }
})

app.get('/admin/movie',function(req,res){
     res.render('admin',{
        title:'iggy 后台管理页',
        movie:{
           title:"",
           doctor:"",
           country:"",
           year:"",
           poster:"",
           flash:"",
           summary:"",
           language:""
        }

    })
})

//list page
app.get('/admin/list',function(req,res){
      Movie.fetch(function(err,movies){
        if(err){
            console.log(err)
         }
        res.render('list',{
          title:'iggy 首页',
          movies:movies
        })

    })
})


// list delete movie data 列表页删除电影
app.delete('/admin/list', function (req, res) {
    var id = req.query.id;
    if (id) {
        Movie.remove({_id: id}, function (err, movie) {
            if (err) {
                console.log(err);
            } else {
                res.json({success: 1});
            }
        });
    }
});