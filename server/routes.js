(function () {
  'use strict';

  var express = require('express');
  var router = express.Router();
  var controller = require('./controllers/controller');

  /** Routes */
  router.post('/tax', controller.log);
  router.post('/tax*', controller.log);

  router.get('/tax', controller.log);
  router.get('/tax*', controller.log);

  module.exports = router;

})();
