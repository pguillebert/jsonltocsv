var stream = require('stream'),
  readline = require('readline'),
  csvf = require('./csvValueFormatter');

function inLinesToOutLines(inStream, outStream, headers){
  var rl = readline.createInterface({
    input: inStream
  });

  rl.on('line',function(line){
    var lineObj = JSON.parse(line),
      values = [],
      tmpValue,
      header;

    for(var i=0; i<headers.length; i++){
      header = headers[i];
      tmpValue=lineObj[header];
      values.push(csvf(tmpValue))
    }

    var outLine = `${values.join(',')}\n`;
    outStream.write(outLine);
  });
}

module.exports = inLinesToOutLines;
