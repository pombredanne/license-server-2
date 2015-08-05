var throng = require('throng');
var licenseServer = require('./.');

var NUM_WORKERS = process.env.WEB_CONCURRENCY || 1;

throng(start, {
  workers: NUM_WORKERS,
  lifetime: Infinity
});

function start() {

  console.log('STARTING SERVER ON PORT', process.env.PORT);

  licenseServer({
    port: process.env.PORT,
    gitToken: process.env.gitToken,
    gitHookSecret: process.env.gitHookSecret,
    org: process.env.org,
    repoRegex: process.env.repoRegex,
  });
}