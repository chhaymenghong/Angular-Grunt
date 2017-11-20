module.exports = function(grunt) {
    var express = require('express');
    var serveStatic = require('serve-static');
    // var path = require('path');
    grunt.registerTask('server', "static server to serve app", function() {
        var app;
        var port;
        var root;
        // grunt.config.get give us access to the config object that the user of this task set up under "initConfig"
        port = grunt.config.get('server.web.port') || 8001;
        // TODO:HONG we can specify base for prod as well
        root = grunt.config.get('server.base') || 'dist';

        // grunt.log.writeln(path.resolve(__dirname));
        grunt.log.writeln("dir: " + process.cwd() + '/' + root);
        grunt.log.writeln('port: ' + port);
        app = express();
        app.get('/', function(req, res) {
           res.send('sdfsdf');
        });

        // app.use(serveStatic("" + process.cwd()) + "/" + root, {'index': 'index.html'});

        app.listen(port);

        grunt.log.writeln("Starting express server at port: " + port);
        return app;
    });
};