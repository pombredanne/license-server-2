var licenseServer = require('./.');

console.log('STARTING SERVER ON PORT', process.env.PORT);

licenseServer({
  port: process.env.PORT,
  gitToken: process.env.gitToken,
  gitHookSecret: process.env.gitHookSecret,
  org: process.env.org,
  repoRegex: process.env.repoRegex,
});
