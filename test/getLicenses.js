'use strict';

var getLicenses = require('../lib/getLicenses');
var getPackageJSON = require('package-json');

getPackageJSON('bigwheel', 'latest', function(err, packageJSON) {

  getLicenses(packageJSON, function(err, licenses) {

    console.log(JSON.stringify(licenses, null, '  '));
  });
});