var fs = require('fs');

var path = require('path');
var appDir = path.dirname(require.main.filename);
var usagePath = path.join(appDir, '../content/usage.txt')

var output = fs.readFileSync(usagePath,'utf8');

function printUsage(){
  console.log(output);
}

module.exports = printUsage;
