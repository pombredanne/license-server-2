'use strict';

var path = require('path');
var fs = require('fs');
var createStaticFiles = require('../createStaticFiles');
var createStaticTempFiles = require('../createStaticTempFiles');

module.exports = function(app, settings, route) {

  app.get(route, function(req, res) {

    var repo = req.params.repo;
    var file = req.params.file || 'index.html';
    var filePath = path.join(settings.staticPath, repo, file);

    if(file === 'index.html' || file === 'index.js' || file === 'index.json') {

      if(file === 'index.js') {
        filePath = path.join(settings.staticPath, file);      
      }

      fs.exists(filePath, function(exists) {

        if(exists) {
          res.sendFile(filePath);
        } else {

          createStaticTempFiles(settings, repo, function(err) {

            if(err) {
              res.send(err);

              return;
            }

            res.sendFile(filePath);
          });

          createStaticFiles(settings, repo, function(err) {});
        }
      });
    } else {

      res.status(404).send('not found');
    }
  });
};