/**
* @overview User database schema initiator
* @author Jannis 'Cludch' Lehmann
* @copyright (c) Cludch
* @license See LICENSE file
*/

'use strict';

const mongoose = require('mongoose');

/**
 * Registers the user schema
 * @return {void}
 */
module.exports = () => {
    const userSchemaArray = {
        UserToken: { type: String, required: true, index: { unique: true } },
        Name: { type: String, required: true },
        Timestamp: { type: Number, default: Math.floor(Date.now() / 1000) },
    };

    const userSchema = new mongoose.Schema(userSchemaArray);

    databaseManager.addSchema('User', userSchema);
};
