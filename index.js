var express = require('express');
var path = require('path');
var serverStatic = require('serve-static');
var app = express();

app.use(serverStatic(__dirname));

var port = process.env.PORT || 5000;
app.listen(port);
console.log('server started '+ port);

app.get('/', function(req, res) {
	res.json({
		'Msg': 'welcome'
	})
})

/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;