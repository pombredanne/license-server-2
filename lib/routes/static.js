'use strict';

var express = require('express');
var fs = require('fs');
var browserify = require('browserify');
var path = require('path');

module.exports = function(app, settings) {

  var staticClientPath = path.join(settings.staticPath, 'index.js');
  var b;

  if(!fs.existsSync(settings.staticPath)) {
    fs.mkdirSync(settings.staticPath);

    b = browserify();

    b.transform({
      global: true 
    }, 'uglifyify');

    b.add(path.join(__dirname, '..', 'client.js'));
    b.bundle().pipe(fs.createWriteStream(staticClientPath));
  }

  app.use(express.static(settings.staticPath));
};