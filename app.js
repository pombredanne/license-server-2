var pm2 = require('pm2');
 
pm2.connect(function() {
  pm2.start({
    script    : 'child.js',
    exec_mode : 'cluster'
  }, function(err, apps) {
    pm2.disconnect();
  });
});