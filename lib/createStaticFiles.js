'use strict';

var getGitPackageJSON = require('./getGitPackageJSON');
var getLicenses = require('./getLicenses');
var writeLicenses = require('./writeLicenses');

module.exports = function(settings, repoName, callback) {

  // whether we should handle this repo
  if(settings.repoRegex.test(repoName)) {

    console.log('Evaluating licenses for', repoName);

    // this will download the package.json from github
    getGitPackageJSON(settings.gitToken, settings.org, repoName, function(err, packageJSON) {
      
      if(err || !packageJSON) {
        console.log('could not get package.json for', repoName);
        callback('could not get package.json for', repoName);

        return;
      }

      // get the license tree     
      getLicenses(settings.gitToken, packageJSON, settings.licenseDepth, function(err, licenses) {

        if(err) {
          callback('could not get licenses for package.json');

          return;
        }

        writeLicenses(settings, repoName, licenses, function(err) {
          if(err) {
            console.log('error while writing license for', repoName);
            callback('error while writing license for', repoName);

            return;
          } else {
            console.log('wrote license for', repoName);
          }

          callback(null);
        });
      });
    });
  }
};