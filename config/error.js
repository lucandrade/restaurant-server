var response = require('./response');

module.exports = {
    handle: function (app) {
        // development error handler
        // will print stacktrace
        if (app.get('env') === 'development') {
            app.use(function(err, req, res, next) {
                res.status(err.status || 500);
                res.send(response.setMessage(err.message).setError(err).setAsFail().get());
            });
        }

        // production error handler
        // no stacktraces leaked to user
        app.use(function(err, req, res, next) {
            res.status(err.status || 500);
            res.send(response.setMessage(err.message).setError(err).setAsFail().get());
        });
    }
}
