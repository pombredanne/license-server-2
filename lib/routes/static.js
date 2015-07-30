'use strict';

var express = require('express');
var fs = require('fs');

module.exports = function(app, settings) {

  if(!fs.existsSync(settings.staticPath)) {
    fs.mkdirSync(settings.staticPath);
  }

  app.use(express.static(settings.staticPath));
};