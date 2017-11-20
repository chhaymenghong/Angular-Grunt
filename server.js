var express = require('express');
var serveStatic = require('serve-static');
// var path = require('path');

var app;
app = express();
console.log("running express at port: " + 8000);
// app.use(serveStatic("" + process.cwd()) + "/" + root, {'index': 'index.html'});
app.get('/', function (req, res) {
    res.send('sdfsdf');
});

app.listen(8000);
