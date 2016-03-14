/**
* @overview Server class, which initializes a new web server
* @author Jannis 'Cludch' Lehmann
* @copyright (c) Cludch
* @license See LICENSE file
*/

'use strict';

const config = require('../config');
const CManager = require('./CManager');
const routes = require('../routes/routes');

/**
* Server manager - Web server
*/
module.exports = class CWebServerManager extends CManager {
    /**
    * Starts the web server on a given port
    * @param  {number} port web server port
    * @param  {Function} resolve promise resolve function
    * @param  {Function} reject promise reject function
    * @todo   never trust somebody else's API, so check the id before passing it
    * @todo   check if saving the model in the session is a BAD idea
    * @todo   Add web server error handling
    * @return {void}
    */
    constructor(port, resolve) {
        super();

        const that = this;

        // Validate the port
        if (typeof port !== 'number') {
            this.port = 8080;
        } else {
            this.port = port;
        }

        const express = require('express');
        const bodyParser = require('body-parser');
        
        /**
         * Holds the express application settings
         * @type {Object}
         */
        this.app = express();
        
        this.app.set('environment', config.NODE_ENV);
        
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use(bodyParser.json());

        this.app.listen(this.port, () => {
            that.log(`Successfully started the web server on port ${that.port}`);
            resolve();
        });
    }

    /**
    * Adds a new GET route. Mainly used for more logging
    * @param {String} route the route for example /test
    * @param {Function} callback Function to be called on route call
    * @return {void}
    */
    addGETRoute(route, callback) {
        this.app.get(route, callback);

        if (config.env === 'development') {
            this.log(`GET route ${route} added`);
        }
    }
    
    /**
    * Adds a new POST route. Mainly used for more logging
    * @param {String} route the route for example /test
    * @param {Function} callback Function to be called on route call
    * @return {void}
    */
    addPOSTRoute(route, callback) {
        this.app.post(route, callback);

        if (config.env === 'development') {
            this.log(`POST route ${route} added`);
        }
    }

    /**
    * Initialises the servers connection
    * @return {Promise} A promise
    */
    static init() {
        return new Promise((resolve) => {
            // Pass promise functions to the constructor
            global.webServerManager = new CWebServerManager(config.webPort, resolve);
            routes();
        });
    }
};
