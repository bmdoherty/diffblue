function compare(a,b) {
  if (a.directory < b.directory)
    return -1;
  if (a.directory > b.directory)
    return 1;
  return 0;
}

export const processData = (data) => {

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

export const filesInfo = (files) => {
    var filesInfo = {}
    
    filesInfo.files = files.length   

    filesInfo.linesCovered = files
      .map(function(f) { return f.linesCovered; })
      .reduce(function(p, c) { return p + c; });

    filesInfo.linesTotal = files
      .map(function(f) { return f.linesTotal; })
      .reduce(function(p, c) { return p + c; });            
        
    filesInfo.percent = parseInt((( filesInfo.linesCovered / filesInfo.linesTotal ) * 100).toFixed(0), 10);

    filesInfo.directory = files[0].directory;

    return filesInfo;
  }

export const directories = (data) => {
    var lastDirectory = '';
    var directories = []

    data.forEach(function(item, index) {
      var file = data[index]

      if (file.directory !== lastDirectory) {
        let files = data.filter(function (f) {
          if (f.directory === file.directory ){
            return f;
          }

          return null
        });  
        
        directories.push( filesInfo(files) )
      }

      lastDirectory = file.directory
    })
    
    return directories
  }

  export const directoryFiles = (data, directory) => {
    var files = data.filter(function (f) {
      if (f.directory === directory ) {
        return f
      };
      return null
    });

    return files;
  }