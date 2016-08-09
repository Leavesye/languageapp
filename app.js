var express = require('express')
var ejs = require('ejs');
var path = require('path');

var app = express();

app.set('views', path.join(__dirname,'/views'));
app.set('view engine', 'ejs');
app.engine('html', ejs.renderFile);

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.static(path.join(__dirname, '/app/bower_components')))


app.get('/', function (req, res, next) {
    res.render('index.html', {
    })
});

app.get('/login', function (req, res, next) {
    res.render('login.html', {
    })
});

app.get('/edit', function (req, res, next) {
    res.render('edit.html', {
    })
});
app.listen(3002, function () { 
    console.log('listen on 3002.');
})