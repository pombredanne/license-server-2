'use strict';

var copyLicenseFiles = require('./copyLicenseFiles');
var path = require('path');

module.exports = function(settings, repoName, callback) {

  var htmlPath = path.join(settings.staticPath, 'failLicense.html');
  var jsonPath = path.join(settings.staticPath, 'failLicense.json');
  
  copyLicenseFiles(settings, repoName, htmlPath, jsonPath, callback);
};