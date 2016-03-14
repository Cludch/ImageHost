/**
* @overview Package entry point
* @author Jannis 'Cludch' Lehmann
* @copyright (c) Cludch
* @license See LICENSE file
*/

'use strict';

const CMain = require('./classes/CMain');
const CUtility = require('./classes/CUtility');

CMain.init().then(() => {
    CUtility.log('\x1b[32mServer started\x1b[0m');
}, (err) => {
    CUtility.log(`\x1b[31m${err}`);
    process.exit(1);
});
