var request = require('request');
var fs = require('fs');

var formData = {
  access_token: 'aaaabbbbccccddddeeeeffff00001111',  // post_server_item token
  version: 'abc123',  // must match client.javascript.code_version in _rollbarConfig client-side
  minified_url: 'https://rollbar.com/static/js/thirdparty.min.js',
  source_map: fs.createReadStream(__dirname + '/thirdparty.min.map'),
  // below is optional - use to upload original source files
  //'static/js/site.js': fs.createReadStream(__dirname + '/static/js/site.js'),
  //'static/js/util.js': fs.createReadStream(__dirname + '/static/js/util.js')
}

request.post({url: 'https://api.rollbar.com/api/1/sourcemap', formData: formData}, function (err, response, body) {
  if (err) {
    return console.error("Upload failed:", err);
  }
  console.log("Upload succeeded.");
});

