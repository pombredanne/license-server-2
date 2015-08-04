'use strict';

var express = require('express');
var fs = require('fs');
var browserify = require('browserify');
var path = require('path');
var fse = require('fs-extra');

module.exports = function(app, settings) {

  var staticClientPath = path.join(settings.staticPath, 'index.js');
  var b;

  if(!fs.existsSync(settings.staticPath)) {

    fse.copySync(path.join(__dirname, '..', '..', 'static_assets'), settings.staticPath);

    b = browserify();

    b.transform({
      global: true 
    }, 'uglifyify');

    b.add(path.join(__dirname, '..', 'client.js'));
    b.bundle().pipe(fs.createWriteStream(staticClientPath));
  }

  app.use(express.static(settings.staticPath));
};