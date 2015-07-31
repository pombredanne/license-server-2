var license = require('./license.json');
var getHTMLFromLicense = require('../../lib/getHTMLFromLicense');

console.log(getHTMLFromLicense('repo name', license));