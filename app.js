var pm2 = require('pm2');
 
pm2.connect(function() {
  pm2.start({
    script: 'child.js',
    exec_mode: 'cluster',
    env: {
      PORT: process.env.PORT,
      gitToken: process.env.gitToken,
      gitHookSecret: process.env.gitHookSecret,
      org: process.env.org,
      repoRegex: process.env.repoRegex
    }
  }, function(err, apps) {
    pm2.disconnect();
  });
});