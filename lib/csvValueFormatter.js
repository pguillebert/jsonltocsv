var quotePattern = /\\"/g;

function formatValueForCSV(aValue){
  var outValue,
    aValueType = typeof(aValue);

  try {
    switch (aValueType) {
      case 'number':
        outValue = isNaN(aValue) ? null : aValue;
        return outValue;
      case 'undefined':
        return null;
      default:
        if(aValue === null) return null
        outValue = JSON.stringify(aValue).replace(quotePattern,'""');
        return outValue;
    }
  } catch(ex){
    return '"parse error"';
  }
}

module.exports = formatValueForCSV;
