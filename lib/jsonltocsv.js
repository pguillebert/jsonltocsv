var readline = require('readline'),
  stream = require('stream'),
  fs = require('fs'),
  csvf = require('./csvValueFormatter'),
  jstocsv = require('./jsonlStreamToCsvLines'),
  jsonFlatten = require('./jsonFlatten'),
  _ = require('lodash'),
  tmp = require('tmp');
  tmp.setGracefulCleanup();

function jsonlToCsv(anInput, anOutput){

  var tmpContentFile = tmp.fileSync(),
    contentStream = fs.createWriteStream(tmpContentFile.name),
    keys = [];

  if(anInput instanceof stream.Stream){
    var rl = readline.createInterface({
      input: anInput,
      output: contentStream
    });


    rl.on('line',function(line){
      var lineObj = JSON.parse(line),
        lineKeys = Object.keys(jsonFlatten(lineObj));

      keys = keys.concat(lineKeys);
      var state = contentStream.write(`${line}\n`,function(){ });
    });

    rl.on('close',function(){
      keys = _.unique(keys);
      var outHeaderString = keys.map(csvf).join(',');
      anOutput.write(`${outHeaderString}\n`);
      contentStream.on('finish', function(){
        outContentStream = fs.createReadStream(tmpContentFile.name)
        jstocsv(outContentStream, anOutput, keys);
      })
      contentStream.end();
    })

  } else {
    throw('must provide a writeable stream');
  }
}

module.exports = jsonlToCsv;
