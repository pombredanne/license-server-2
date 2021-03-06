'use strict';

var path = require('path');
var mkdirp = require('mkdirp');
var async = require('async');
var fse = require('fs-extra');

module.exports = function(settings, repoName, htmlPath, jsonPath, callback) {

  var pathRepoDir = path.join(settings.staticPath, repoName);
  var pathRepoLicense = path.join(pathRepoDir, 'index.json');
  var pathRepoLicenseHTML = path.join(pathRepoDir, 'index.html');

  mkdirp(pathRepoDir, function(err) {

    if(err) {
      console.log('could not make repo dir: ' + pathRepoDir);

      return;
    }

    var toWrite = [ 
      [ jsonPath, pathRepoLicense ],
      [ htmlPath, pathRepoLicenseHTML ]
    ];

    async.each(
      toWrite,
      function(item, callback) {
        fse.copy(item[ 0 ], item[ 1 ], callback);
      },
      callback
    );
  });
};