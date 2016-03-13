'use strict';

var Plan = require('./plan');
var fs = require('fs');

function FQL (table) {
  this.table = table;
  this.plan = new Plan();
}

FQL.prototype.exec = function() {
  this.table.each(function(){})
  return this.table.rows;
};

// FQL.prototype.count = function(){
//   var result = [];
//   this.table.each(function(row){
//     result.push(row);
//   })
//   return result.length;
// }

FQL.prototype.count = function(){
  //return fs.readdirSync(this.table.filePath).length;
  return this.exec().length;
};

FQL.prototype.limit = function(num){
  // this.table.rows = this.table.rows[0,num]
  // // var copiedTable = something(originalTable)
  // return table.rows[0,limit];
  // return this;   // return a FQL query
  // var count = 0;
  // if(count < num){
  //   count++;
  //   return true;
  // } else {
  //   count = 0;
  //   return false;
  // }
  this.plan.continueConditions.push(function(currentRows){
    return currentRows.length < num;
  });
  return this;
}


// Table.prototype.each = function(myFunc,continuePredicate) {
//   for(var i = 0; i < this.rows.length; i++) {
//       myFunc(this.rows[i]);
//       if(continuePredicate){
//         if(!continuePredicate()){
//           return;
//         }
//       }
//   };
// };

FQL.prototype.select = function(column) {
  this.plan.rowTransformers.push(function(){
    var selected = {};
    selected[column] = row[column];
    return selected;
  });
  return this;
}

module.exports = FQL;