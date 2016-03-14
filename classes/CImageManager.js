/**
* @overview CImageManager
* @author Jannis 'Cludch' Lehmann
* @copyright (c) Cludch
* @license See LICENSE file
*/

'use strict';

const CManager = require('./CManager');
const CUtility = require('./CUtility');

/**
 * Image class
 */
module.exports = class CImageManager extends CManager {
    /**
     * Inits the image manager
     * @param  {Function} resolve promise resolve function
     * @return {void}
     */
    constructor(resolve) {
        super();
        resolve();
    }
    
    /**
     * Adds a new image to the database
     * @param  {String} userToken uploader token
     * @param  {String} content base64 iamge
     * @return {void}
     */
    addImage(userToken, content) {
        const that = this;
        
        return new Promise((resolve, reject) => {
            userManager.tokenExists(userToken).then(() => {
                const ImageSchema = databaseManager.getSchema('Image');
                const imageID = CUtility.generateId();
                const imageContent = content.replace(/^data:image\/png;base64,/, '');
                const image = new ImageSchema({ ID: imageID, Content: imageContent,
                UserToken: userToken });
                
                image.save((err) => {
                    if (err) {
                        reject(err);
                    } else {
                        that.log(`New image - ${imageID}`);
                        resolve(imageID);
                    }
                });
            }, (err) => {
                reject(err);
            });
        });
    }
    
    /**
     * Returns a image
     * @param  {String} imageID image id
     * @return {void}
     */
    getImage(imageID) {
        return new Promise((resolve, reject) => {
            const ImageSchema = databaseManager.getSchema('Image');
            ImageSchema.findOne({ ID: imageID }, (err, obj) => {
                if (err || !obj) {
                    reject(err);
                } else {
                    resolve(obj.Content);
                }
            });
        });
    }
    
    /**
    * Initialises the image manager
    * @return {Promise} A promise
    */
    static init() {
        return new Promise((resolve) => {
            // Pass promise function to the constructor
            global.imageManager = new CImageManager(resolve);
        });
    }
};
