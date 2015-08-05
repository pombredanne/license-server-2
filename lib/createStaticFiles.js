'use strict';

var getGitPackageJSON = require('./getGitPackageJSON');
var getLicenses = require('./getLicenses');
var writeLicenses = require('./writeLicenses');
var createFailTempFiles = require('./createFailTempFiles');

module.exports = function(settings, repoName, callback) {
  
  // whether we should handle this repo
  if(settings.repoRegex.test(repoName)) {

    console.log('Evaluating licenses for', repoName);

    // this will download the package.json from github
    getGitPackageJSON(settings.gitToken, settings.org, repoName, function(err, packageJSON) {
      
      if(err || !packageJSON) {
        console.log('could not get package.json for', repoName);
        writeFailFiles(callback);

        return;
      }

      // get the license tree     
      getLicenses(settings.gitToken, packageJSON, settings.licenseDepth, function(err, licenses) {

        if(err) {
          console.log('could not get licenses for package.json');
          writeFailFiles(callback);

          return;
        }

        writeLicenses(settings, repoName, licenses, function(err) {
          if(err) {
            console.log('error while writing license for', repoName);
            writeFailFiles(callback);

            return;
          } else {
            console.log('wrote license for', repoName);
          }

          callback(null);
        });
      });
    });
  }

  function writeFailFiles(callback) {

    createFailTempFiles(settings, repoName, callback);
  }
};