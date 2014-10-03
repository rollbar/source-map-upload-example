var request = require('request');
var fs = require('fs');

request({
  url: 'https://api.rollbar.com/api/1/sourcemap',
  headers: {
    'content-type': 'multipart/form-data'
  },
  method: 'POST',
  multipart: [
    // Field name goes in the "name" part of the Content-Disposition
    // Value goes in the body
    {
      'Content-Disposition': 'form-data; name="access_token"',
      body: 'aaaabbbbccccddddeeeeffff00001111'
    },
    {
      'Content-Disposition': 'form-data; name="version"',
      body: 'abc123'
    },
    {
      'Content-Disposition': 'form-data; name="minified_url"',
      body: 'https://rollbar.com/static/js/thirdparty.min.js'
    },
    {
      'Content-Disposition': 'form-data; name="source_map"; filename="thirdparty.min.map"',
      body: fs.readFileSync('./thirdparty.min.map')
    }
    // below is optional - use to upload original source files
    /*
    , {
      'Content-Disposition': 'form-data; name="static/js/site.js"; filename="site.js"',
      body: fs.readFileSync('./static/js/site.js')
    }
    */
  ]
}, function(err, response, body) {
  if (err) {
    return console.error("Upload failed:", err);
  }
  if (response.statusCode !== 200) {
    console.error("Upload failed. Got status code ", response.statusCode);
    console.error(body);
  } else {
    console.log("Upload succeeded.");
    console.log(body);
  }
});
