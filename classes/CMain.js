/**
* @overview Package entry point class - CMain
* @author Jannis 'Cludch' Lehmann
* @copyright (c) Cludch
* @license See LICENSE file
*/

'use strict';

const CUtility = require('./CUtility');

const CDatabaseManager = require('./CDatabaseManager');
const CImageManager = require('./CImageManager');
const CUserManager = require('./CUserManager');
const CWebServerManager = require('./CWebServerManager');

/**
 * Initializes the server and its components
 */
module.exports = class CMain {
    /**
    * Initialises the package
    * @return {Promise} A Promise
    */
    static init() {
        const promises = [];

        CUtility.log('-------------------------------------');
        CUtility.log('-        Cludch - Image Host        -');
        CUtility.log('- Copyright (C) 2016 Jannis Lehmann -');
        CUtility.log('-           Author: Cludch          -');
        CUtility.log('-          Contributors : /         -');
        CUtility.log('-------------------------------------');

        promises.push(CDatabaseManager.init());
        promises.push(CImageManager.init());
        promises.push(CUserManager.init());
        promises.push(CWebServerManager.init());

        return new Promise((resolve, reject) => {
            Promise.all(promises).then(() => {
                // global.userManager.addUser("Cludch").then(function(token) {console.log(token)});
                resolve();
            }, (err) => {
                reject(err);
            });
        });
    }
};
