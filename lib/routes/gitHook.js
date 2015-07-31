'use strict';

var getGitPackageJSON = require('../getGitPackageJSON');
var getLicenses = require('../getLicenses');
var writeLicenses = require('../writeLicenses');

module.exports = function(app, settings, route) {

  var createHandler = require('github-webhook-handler');
  var handler = createHandler({ path: route, secret: settings.gitHookSecret });

  app.post(route, function(req, res) { 
    handler(req, res, function(err) {
      res.statusCode = 404;
      res.end('no such location');
    });
  });

  // the following will handle git webhook pushes
  handler.on('push', function (ev) {

    var repoName = ev.payload.repository.name;

    console.log('PUSH EVENT', repoName);

    // whether we should handle this repo
    if(settings.repoRegex.test(repoName)) {

      console.log('Evaluating licenses for', repoName);

      // this will download the package.json from github
      getGitPackageJSON(settings.gitToken, settings.org, repoName, function(err, packageJSON) {
        
        if(err || !packageJSON) {
          console.log('could not get package.json for', repoName);

          return;
        }

        // get the license tree     
        getLicenses(settings.gitToken, packageJSON, settings.licenseDepth, function(err, licenses) {

          writeLicenses(settings, repoName, licenses, function(err) {
            if(err) {
              console.log('error while writing license for', repoName);
            } else {
              console.log('wrote license for', repoName);
            }
          });
        });
      });
    }
  });

  function handlePushHook(repo) {
    console.log('repo pushed to', repo);
  }
};