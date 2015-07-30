'use strict';

module.exports = function(app, settings, route) {

  var createHandler = require('github-webhook-handler');
  var handler = createHandler({ path: route, secret: settings.gitHookSecret });

  app.post(route, function(req, res) { 
    handler(req, res, function(err) {
      res.statusCode = 404;
      res.end('no such location');
    });
  });

  handler.on('push', function (ev) {
    handlePushHook(ev.payload.repository.name);
  });

  function handlePushHook(repo) {
    console.log('repo pushed to', repo);
  }
};