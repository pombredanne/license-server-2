'use strict';

var fs = require('fs');
var path = require('path');
var mkdirp = require('mkdirp');

module.exports = function(settings, repoName, licenses) {

  var pathRepoDir = path.join(settings.staticPath, repoName);
  var pathRepoLicense = path.join(pathRepoDir, 'license.json');

  mkdirp(pathRepoDir, function(err) {

    if(err) {
      console.log('could not make repo dir: ' + pathRepoDir);

      return;
    }

    fs.writeFile(pathRepoLicense, JSON.stringify(licenses), function(err) {

      if(err) {
        console.log('could not make license json: ' + pathRepoLicense);

        return;
      }
    });
  });
};