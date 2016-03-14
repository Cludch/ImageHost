/**
* @overview Schema initiator
* @author Jannis 'Cludch' Lehmann
* @copyright (c) Cludch
* @license See LICENSE file
*/

'use strict';

const imageSchema = require('./imageSchema');
const userSchema = require('./userSchema');

/**
 * Calls the schema register functions
 * @return {void}
 */
module.exports = () => {
    imageSchema();
    userSchema();
};
