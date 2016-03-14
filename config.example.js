/**
* @overview Example configuration file
* @author Jannis 'Cludch' Lehmann
* @copyright (c) Cludch
* @license See LICENSE file
*/

'use strict';

// ---------------------------------
// - RENAME THIS FILE TO config.js -
// ---------------------------------

module.exports = {
    env: process.env.NODE_ENV || 'production',
    webPort: process.env.WEB_PORT || 4040,
    mongo: {
        ip: process.env.MONGO_IP || '127.0.0.1',
        port: process.env.MONGO_PORT || 27017,
        username: process.env.MONGO_USERNAME || 'images',
        password: process.env.MONGO_PASSWORD || 'password',
        database: process.env.MONGO_DATABASE || 'images'
    },
};
