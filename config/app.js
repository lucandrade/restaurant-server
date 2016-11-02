'use strict';

module.exports = {
    secret: process.env.SECRET || 'iyqetqtre',
    database: {
        url: process.env.DB_URL || 'localhost',
        port: process.env.DB_PORT || '27017',
        name: process.env.DB_NAME || 'restaurant'
    },
    userType: ['admin', 'waiter', 'cashier', 'chef']
}
