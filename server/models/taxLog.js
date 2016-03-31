(function(){
  'use strict';

  var mongoose = require('mongoose');
  var Schema = mongoose.Schema;

  var taxLog = new Schema({
    request: { type: Schema.Types.Mixed },
    headers: { type: Schema.Types.Mixed },
    created: { type: Date, default: Date.now }
  });

  taxLog.pre('save', function(next) {
    var currentDate = new Date();
    if (!this.created) {
      this.created = currentDate;
    }
    next();
  });

  module.exports = mongoose.model('taxLog', taxLog);

})();
