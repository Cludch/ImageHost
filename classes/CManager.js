/**
* @overview CManager
* @author Jannis 'Cludch' Lehmann
* @copyright (c) Cludch
* @license See LICENSE file
*/

'use strict';

const CUtility = require('./CUtility');

/**
 * Manager template
 */
module.exports = class CManager {
    /**
     * Abstract constructor
     * @abstract
     * @return {void}
     */
    constructor() {
        if (this.constructor.name === 'CManager') {
            throw CUtility.log('ERROR: Tried to create a CManager instance!');
        }

        this.log('Constructor called');
    }

    /**
     * Logs a message with the class name in brackets
     * @param {String} message the message to be logged
     * @return {void}
     */
    log(message) {
        CUtility.log(`[${this.constructor.name}] ${message}`);
    }
};
