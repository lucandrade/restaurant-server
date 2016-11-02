'use strict';

module.exports = {
    secret: process.env.SECRET || '29384ghw6asdftyiasdf675',
    database: {
        url: process.env.DB_URL || 'localhost',
        port: process.env.DB_PORT || '27017',
        name: process.env.DB_NAME || 'restaurant'
    },
    userType: ['admin', 'waiter', 'cashier', 'chef'],
    upload_dir: process.env.UPLOAD_DIR || 'public/uploads/',
    upload_url: process.env.UPLOAD_URL || 'http://localhost:3000/uploads/'
}
