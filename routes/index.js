/**
* @overview Index route
* @author Jannis 'Cludch' Lehmann
* @copyright (c) Cludch
* @license See LICENSE file
*/

'use strict';

const fs = require('fs');
const multiparty = require('multiparty');

const config = require('../config');

/**
 * Registers the index route
 * @return {void}
 */
module.exports = () => {
    webServerManager.addGETRoute('/:image', (req, server) => {
        imageManager.getImage(req.params.image).then((image) => {
            const img = new Buffer(image, 'base64');
            server.writeHead(200, {
                'Content-Type': 'image/png',
                'Content-Length': img.length,
            });
            server.end(img);
        }, (err) => {
            if (config.ENV === 'development') {
                server.send(err);
            } else {
                server.sendStatus(404);
            }
        });
    });
    
    webServerManager.addPOSTRoute('/', (req, server) => {
        if (req.headers['content-type'].indexOf('multipart/form-data') !== 0) {
            server.sendStatus(400);
            return;
        }
        
        const userToken = req.headers.authorization;

        if (!userToken) {
            server.sendStatus(400);
            return;
        }
        
        const form = new multiparty.Form();
        
        form.parse(req, (errForm, fields, files) => {
            if (files && files.image) {
                userManager.tokenExists(userToken).then(() => {
                    const image = fs.readFileSync(files.image[0].path);
                    const imageData = image.toString('base64');

                    imageManager.addImage(userToken, imageData).then((imageID) => {
                        server.send(`${config.url}/${imageID}`);
                    }, (err) => {
                        if (config.ENV === 'development') {
                            server.send(err);
                        } else {
                            server.sendStatus(500);
                        }
                    });
                }, (err) => {
                    if (config.ENV === 'development') {
                        server.send(err);
                    } else {
                        server.sendStatus(403);
                    }
                });
            } else if (files && files.file) {
                userManager.tokenExists(userToken).then(() => {
                    const image = fs.readFileSync(files.file[0].path);
                    const imageData = image.toString('base64');

                    imageManager.addImage(userToken, imageData).then((imageID) => {
                        server.send(`${config.url}/${imageID}`);
                    }, (err) => {
                        if (config.ENV === 'development') {
                            server.send(err);
                        } else {
                            server.sendStatus(500);
                        }
                    });
                }, (err) => {
                    if (config.ENV === 'development') {
                        server.send(err);
                    } else {
                        server.sendStatus(403);
                    }
                });
            } else {
                server.sendStatus(400);
                return;
            }
        });
    });
};
