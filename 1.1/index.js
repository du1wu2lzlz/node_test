var fs = require('fs');

fs.readdir(__dirname,function (err, files){
    console.log(files);
});

//fs模块