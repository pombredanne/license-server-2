'use strict';

var getLicense = require('licenses');
var async = require('async');
var getPackageJSON = require('package-json');
var githulk = require('githulk');

module.exports = function(gitToken, packageJSON, maxDepth, callback) {

  var licenses = {};
  var hulk = new githulk( {

    token: gitToken
  });

  traverse(hulk, packageJSON, 0, maxDepth, licenses, callback);
};

function traverse(hulk, packageJSON, depth, maxDepth, licenses, callback) {

  var deps;

  if(packageJSON && depth < maxDepth && packageJSON.dependencies) {

    // setup a structure that has name + version in an array
    deps = Object.keys(packageJSON.dependencies).map( function(depName) {

      return [ depName, getVersion(packageJSON.dependencies[ depName ]) ];
    });

    // now get the license for the current dependencies
    getLicensesForDeps(hulk, deps, function(err, depLicenses) {

      // add licenses to dependencies
      licenses.dependencies = depLicenses;

      getPackageJSONForDeps(deps, function(err, depPackageJSON) {

        // add packageJSON to the deps
        deps = deps.map( function(cDep, i) {

          cDep.push(depPackageJSON[ i ]);

          return cDep;
        });

        // now we want to call traverse for all dependencies
        async.each(
          deps, 
          function(nameVersionPackage, next) {

            // if we have a version number for this dependency
            // then traverse
            if(nameVersionPackage[ 1 ]) {

              traverse(
                hulk,
                nameVersionPackage[ 2 ], 
                depth + 1, 
                maxDepth,
                licenses.dependencies[ nameVersionPackage[ 0 ] ],
                next
              );
            } else {
              next(null, null);
            }
          },
          function() {
            callback(null, licenses);
          });
      });
    });
  // was not able to get package.json
  } else if(!packageJSON) {

    licenses.dependencies = null;

    callback(null, licenses);
  } else {

    callback(null, licenses);
  }
}

function getPackageJSONForDeps(depNameVersion, callback) {

  async.map(depNameVersion, function(nameAndVersion, next) {

    if(nameAndVersion[ 1 ]) {
      // the following will get the package.json object for dependencies
      getPackageJSON(nameAndVersion[ 0 ], nameAndVersion[ 1 ], function(err, packageJSON) {

        if(err) {
          next(null, null);
        } else {
          next(null, packageJSON);
        }
      });
    } else {

      next(null, null);
    }
  }, callback);
}

function getLicensesForDeps(hulk, depNameVersion, callback) {

  async.reduce(depNameVersion, {}, function(licenses, dep, next) {

    var depAtVersion = dep[ 0 ] + '@' + dep[ 1 ];

    // if there's a version number
    // then we should try to get the license
    // otherwise it might be a git dep
    if(dep[ 1 ]) {

      getLicense(depAtVersion, { githulk: hulk }, function(err, license) {

        licenses[ dep[ 0 ] ] = {
          // for some reason licenses returns an array
          license: license && license[ 0 ],
          version: dep[ 1 ]
        };

        next(null, licenses);
      });
    } else {

      licenses[ dep[ 0 ] ] = null;

      next(null, licenses);
    }
  }, callback);
}

function getVersion(version) {

  // this might be a git repo url
  try {
    return /(\d|\*)+(\.(\d|\*)+(\.(\d|\*)+)?)?/.exec(version)[ 0 ];  
  } catch(e) {
    console.log(version);

    return null;
  }
}