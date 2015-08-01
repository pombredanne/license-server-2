var path = require('path');
var fs = require('fs');
var createStaticFiles = require('../createStaticFiles');

module.exports = function(app, settings, route) {

  app.get(route, function(req, res) {

    var repo = req.params.repo;
    var file = req.params.file;
    var filePath = path.join(settings.staticPath, repo, filePath);

    fs.exists(filePath, function(exists) {

      if(exists) {
        res.sendFile(filePath);
      } else {
        createStaticFiles(settings, repo, function(err) {

          if(err) {
            res.send(err);

            return;
          }

          res.sendFile(filePath);
        });
      }
    });
  });
};