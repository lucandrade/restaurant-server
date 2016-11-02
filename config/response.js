var message = '',
    error = '',
    data = {},
    code = null,
    status = true;

function response() {
    var me = this;

    me.setStatus = function (newStatus) {
        status = newStatus;
        return me;
    }

    me.setError = function (newError) {
        error = newError;
        return me;
    }

    me.setData = function (newData) {
        data = newData;
        return me;
    }

    me.setMessage = function (newMessage) {
        message = newMessage;
        return me;
    }

    me.setCode = function (newCode) {
        code = newCode;
        return me;
    }

    me.setAsFail = function () {
        data = {};
        status = false;
        return me;
    }

    me.setAsSuccess = function () {
        status = true;
        message = '';
        error = '';
        return me;
    }

    me.get = function () {
        return {
            data: data,
            message: message,
            error: error,
            status_code: code,
            status: status,
            time: Date.now()
        }
    }
}

module.exports = new response();
