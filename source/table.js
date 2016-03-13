'use strict';

var fs = require('fs');

function Table (folderPath) {
  this.folderPath = folderPath;
  this.fileNames = fs.readdirSync(this.folderPath);
  var table = this;
  this.rows = this.fileNames.map(function(file){    
    return JSON.parse(fs.readFileSync(table.folderPath+'/'+file));
  });
}

Table.prototype.read = function(id) {
  return this.rows.find(function(row){
    return row.id === id;
  })
};

Table.prototype.each = function(myFunc,continuePredicate) {
  for(var i = 0; i < this.rows.length; i++) {
      myFunc(this.rows[i]);
      if(continuePredicate){
        if(!continuePredicate()){
          return;
        }
      }
  };
};


module.exports = Table;
