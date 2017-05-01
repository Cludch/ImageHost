/**
* @overview Image database schema initiator
* @author Jannis 'Cludch' Lehmann
* @copyright (c) Cludch
* @license See LICENSE file
*/

'use strict';

const config = require('../config');
const mongoose = require('mongoose');

/**
 * Registers the image schema
 * @return {void}
 */
module.exports = () => {
    const imageSchemaArray = {
        ID: { type: String, required: true, index: { unique: true } },
        Content: { type: String, required: true },
        UserToken: { type: String, required: true },
        Timestamp: { type: Number, default: Math.floor(Date.now() / 1000) },
        createdAt: { type: Date, expires: config.expiresAt, default: Date.now }
    };

    const imageSchema = new mongoose.Schema(imageSchemaArray);

    databaseManager.addSchema('Image', imageSchema);
};
