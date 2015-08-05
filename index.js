'use strict';

var path = require('path');

module.exports = function(settings) {

  settings = settings || {};
  settings.staticPath = settings.staticPath || path.join(process.cwd(), 'static');
  settings.gitHookSecret = settings.gitHookSecret || '';
  settings.licenseDepth = settings.licenseDepth || Number.MAX_VALUE;
  
  if(!(settings.repoRegex instanceof RegExp)) {
    
    settings.repoRegex = settings.repoRegex ? new RegExp(settings.repoRegex) : new RegExp('.*');
  }

  var express = require('express');
  var bodyParser = require('body-parser');

  var setupStatic = require('./lib/routes/static');
  var gitHook = require('./lib/routes/gitHook');
  var project = require('./lib/routes/project');

  var app = express();
  var port = settings.port || 3000;

  app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
  })); 


  app.get('/', function(req, res) {
    res.send('hey there');
  });

  setupStatic(app, settings);
  gitHook(app, settings, '/git_hook');
  project(app, settings, '/:repo/');
  project(app, settings, '/:repo/:file');

  console.log('STARTING SERVER ON PORT', port);
  app.listen(port);
};
  