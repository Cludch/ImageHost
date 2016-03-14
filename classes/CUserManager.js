/**
* @overview CUserManager
* @author Jannis 'Cludch' Lehmann
* @copyright (c) Cludch
* @license See LICENSE file
*/

'use strict';

const CManager = require('./CManager');
const CUtility = require('./CUtility');

/**
 * User class
 */
module.exports = class CUserManager extends CManager {
    /**
     * Inits the user manager
     * @param  {Function} resolve promise resolve function
     * @return {void}
     */
    constructor(resolve) {
        super();
        resolve();
    }
    
    /**
     * Checks if a user token exists
     * @param  {String} token user token
     * @return {Promise} promise
     */
    tokenExists(token) {
        return new Promise((resolve, reject) => {
            const UserSchema = databaseManager.getSchema('User');
            
            UserSchema.findOne({ UserToken: token }, (err, obj) => {
                if (err || !obj) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
    }
    
    /**
     * Adds a new user
     * @param  {String} name the user name
     * @return {Object} user object
     */
    addUser(name) {
        return new Promise((resolve, reject) => {
            const userToken = CUtility.generateId();
            
            const UserSchema = databaseManager.getSchema('User');
            const user = new UserSchema({ UserToken: userToken, Name: name });
            
            user.save((err, userObject) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(userObject);
                }
            });
        });
    }
    
    /**
    * Initialises the user manager
    * @return {Promise} A promise
    */
    static init() {
        return new Promise((resolve) => {
            // Pass promise function to the constructor
            global.userManager = new CUserManager(resolve);
        });
    }
};
