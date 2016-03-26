var fs = require('fs');

module.exports = function(cb) {
  fs.unlinkSync('client/assets/scss/_variables.scss');
  fs.createReadStream('bower_components/bootstrap/scss/_variables.scss')
    .pipe(fs.createWriteStream('client/assets/scss/_variables.scss'))
    .on('finish', function() {
      cb();
    });
}
