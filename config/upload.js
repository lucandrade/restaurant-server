'use strict';

var config = require('../config/app');
var multer = require('multer');
var crypto = require('crypto');

var storage = multer.diskStorage({
    destination: config.upload_dir,
    filename: function (req, file, cb) {
        crypto.pseudoRandomBytes(16, function (err, raw) {
            var name = raw.toString('hex') + Date.now() + '.' + file.originalname.split('.').pop();
            cb(null, name);
        });
    }
});

var upload = multer({ storage: storage });

module.exports = upload;
