module.exports = processData;

function compare(a,b) {
  if (a.directory < b.directory)
    return -1;
  if (a.directory > b.directory)
    return 1;
  return 0;
}

function processData(data) {
  var newData = [];
  Object.keys(data).forEach(function(key, index) {
    var item = {};
    var arr = key.split('/');
    
    item.key = key;
    item.fileName = arr.pop();
    item.directory = arr.join('/') + '/'; 
    item.linesCovered = data[key][0]; 
    item.linesTotal = data[key][1]; 

    newData.push(item);  
  })

  return newData.sort(compare);
}