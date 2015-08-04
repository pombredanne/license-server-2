'use strict';

var api = require('gh-api-stream');

module.exports = function(token, org, repo, callback) {

  api('/repos/' + org + '/' + repo +  '/contents/package.json', {
    token: token
  })
  .on('data', function(response) {

    var packageStr = (new Buffer(response.content, 'base64')).toString();

    callback(null, JSON.parse(packageStr));
  })
  .on('error', function(err) {

    callback(err);
  });
};