'use strict';

var createStaticFiles = require('../createStaticFiles');

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

    createStaticFiles(settings, repoName);
  });

  function handlePushHook(repo) {
    console.log('repo pushed to', repo);
  }
};