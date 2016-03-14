/**
* @overview Routes initiator
* @author Jannis 'Cludch' Lehmann
* @copyright (c) Cludch
* @license See LICENSE file
*/

'use strict';

const index = require('./index');

/**
 * Registers the default web routes
 * @return {void}
 */
module.exports = () => {
    index();
};
