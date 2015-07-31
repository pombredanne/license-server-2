'use strict';

var getPackageJSON = require('package-json');
var getLicenses = require('../lib/getLicenses');
var writeLicenses = require('../lib/writeLicenses');

getPackageJSON('bigwheel', 'latest', function(err, packageJSON) {

  getLicenses(packageJSON, Number.MAX_VALUE, function(err, licenses) {

    writeLicenses( { staticPath: 'static/' }, 'testRepo', licenses);
  });
});