var licenseServer = require('./.');

licenseServer({
  gitToken: process.env.gitToken,
  gitHookSecret: process.env.gitHookSecret,
  org: process.env.org,
  repoRegex: process.env.repoRegex,
});
