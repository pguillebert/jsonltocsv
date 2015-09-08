var jsonlToCsv = require('./jsonltocsv'),
  fs = require('fs');

function execAsProcess(){
  var argv = require('minimist')(process.argv.slice(2)),
    printUsage = require('./printUsage');

  if(argv.h || argv.help){
    printUsage();
    return;
  }

  var infile = argv._.length && argv._[argv._.length-1],
    inStream;

  if(infile){
    try{
      inStream = fs.createReadStream(infile);
    } catch(ex){
      console.error(ex)
      printUsage();
      return -1;
    }
  }else{
    inStream = process.stdin;
  }

  jsonlToCsv(inStream, process.stdout);
}

module.exports = execAsProcess;
