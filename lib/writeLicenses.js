'use strict';

var fs = require('fs');
var path = require('path');
var mkdirp = require('mkdirp');
var async = require('async');
var getHTMLFromLicense = require('./getHTMLFromLicense');

module.exports = function(settings, repoName, licenses, callback) {

  var pathRepoDir = path.join(settings.staticPath, repoName);
  var pathRepoLicense = path.join(pathRepoDir, 'license.json');
  var pathRepoLicenseHTML = path.join(pathRepoDir, 'index.html');

  mkdirp(pathRepoDir, function(err) {

    if(err) {
      console.log('could not make repo dir: ' + pathRepoDir);

      return;
    }

    var toWrite = [ 
      [ pathRepoLicense, JSON.stringify(licenses) ],
      [ pathRepoLicenseHTML, getHTMLFromLicense(repoName, licenses) ]
    ];

    async.each(
      toWrite,
      function(item, callback) {
        fs.writeFile(item[ 0 ], item[ 1 ], callback);
      },
      callback
    );
  });
};