module.exports = function(settings) {

  settings = settings || {};
  settings.staticPath = settings.staticPath || 'static';
  settings.gitHookSecret = settings.gitHookSecret || '';

  var express = require('express');
  var bodyParser = require('body-parser');

  var setupStatic = require('./lib/routes/static');
  var gitHook = require('./lib/routes/gitHook');

  var app = express();
  var port = process.env.PORT || 3000;

  app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
  })); 

  setupStatic(app, settings);
  gitHook(app, settings, '/git_hook');

  app.listen(port);
};
  