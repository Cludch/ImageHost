/**
* @overview CDatabaseManager
* @author Jannis 'Cludch' Lehmann
* @copyright (c) Cludch
* @license See LICENSE file
*/

'use strict';

const assert = require('assert');
const mongoose = require('mongoose');

const CManager = require('./CManager');

const config = require('../config');
const schemas = require('../schemas/schemas');

/**
 * Database Manager
 */
module.exports = class CDatabaseManager extends CManager {
    /**
     * Establishes a database connection
     * @param  {String} username MongoDB username
     * @param  {String} password MongoDB password
     * @param  {String} ip MongoDB server ip
     * @param  {number} port MongoDB server port
     * @param  {String} database MongoDB database name
     * @param  {Function} resolve promise resolve function
     * @param  {Function} reject promise reject function
     * @return {void}
     */
    constructor(username, password, ip, port, database, resolve, reject) {
        super();

        /**
         * Map will hold all initialized schemas
         * @type {Map}
         */
        this.schemas = new Map();

        /**
         * Current database connection
         * @type {Object}
         */
        mongoose.connect(`mongodb://${username}:${password}@${ip}:${port}/${database}`);

        mongoose.connection.on('error', (err) => {
            reject(err);
        });

        const that = this;

        mongoose.connection.once('open', () => {
            that.log('Established a database connection');

            // Initialize the schemas
            that.initSchemas();

            resolve();
        });
    }

    /**
     * Adds a schema
     * @param {String} name schema name, i.e. Player
     * @param {Function} schema schema ready to activate using mongoose.model
     * @return {void}
     */
    addSchema(name, schema) {
        if (this.schemas.has(name)) {
            this.log(`${name} schema already exists`);
            return;
        }

        this.schemas.set(name, mongoose.model(name, schema));
        this.log(`${name} schema has been added`);
    }

    /**
     * Gets a schema by its name
     * @param  {string} name schema name
     * @return {Object} account schema
     */
    getSchema(name) {
        assert(typeof name === 'string');

        if (!this.schemas.has(name)) {
            return null;
        }

        return this.schemas.get(name);
    }

    /**
    * Initates the database schemas
    * @return {void}
    */
    initSchemas() {
        this.log('Starting database schema inititation...');

        // Call register function
        schemas();

        this.log('Finished database schema initiation');
    }

    /**
    * Initialises the database connection
    * @return {Promise} A promise
    */
    static init() {
        return new Promise((resolve, reject) => {
            // Pass promise functions to the constructor
            global.databaseManager = new CDatabaseManager(config.mongo.username,
            config.mongo.password, config.mongo.ip, config.mongo.port,
            config.mongo.database, resolve, reject);
        });
    }
};
