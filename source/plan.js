'use strict';

function Plan () {
  this.continueConditions = [];
  this.rowTransformers = [];
}

Plan.prototype.shouldContinue = function(){
  var cond = this.continueConditions[0];
  if (cond === undefined) {
    return false;
  } else {
    return cond();
  }
}


Plan.prototype.transformRow = function(row){
  // var resultingRow = row;
  // for (var i = 0; i < this.rowTransformers.length; i++) {
  //   resultingRow = this.rowTransformers[i](resultingRow);
  // }
  // return resultingRow;
  return this.rowTransformers.reduce(function(resultingRow,transformer){
    return transformer(resultingRow);
  },row);
};

module.exports = Plan;