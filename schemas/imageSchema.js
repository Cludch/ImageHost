/**
* @overview Image database schema initiator
* @author Jannis 'Cludch' Lehmann
* @copyright (c) Cludch
* @license See LICENSE file
*/

'use strict';

const config = require('../config');
const mongoose = require('mongoose');
const ttl = require('mongoose-ttl');

/**
 * Registers the image schema
 * @return {void}
 */
module.exports = () => {
    const imageSchemaArray = {
        ID: { type: String, required: true, index: { unique: true } },
        Content: { type: String, required: true },
        UserToken: { type: String, required: true },
        CreatedAt: { type: Number, default: + new Date() }
    };

    const imageSchema = new mongoose.Schema(imageSchemaArray);
    imageSchema.plugin(ttl, { ttl: config.expiresAt });

    databaseManager.addSchema('Image', imageSchema);
};
