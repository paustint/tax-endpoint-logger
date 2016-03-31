(function(){
  'use strict';

  var _ = require("lodash");
  var TaxLog = require("../models/taxLog");

  /**
   * 200 - OK success GET
   * 201 - created success POST
   * 203 - created success PUT
   * 204 - no content success DELETE
   * 400 bad request
   * 401 unathorized
   * 403 forbidden
   * 404 not found
   * 405 method not allowed
   */
  /** Helper function to send JSON server response */
  var sendJson = function(res, status, content) {
        // Add default message
        content = content || {};
        if ((status === 200 || status === 201 || status === 203) &&
            !content.hasOwnProperty('message')) {
                content.message = "ok";
        }
        res.status(status);
        res.json(content);
  };

  /** Helper function to send server response */
  var sendXML = function(res, successValue) {
    if (_.isUndefined(successValue)) {
      successValue = false;
    }
    res.send(
      '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:out="http://soap.sforce.com/2005/09/outbound"><soapenv:Header/><soapenv:Body><out:notificationsResponse><out:Ack>'+successValue+'</out:Ack></out:notificationsResponse></soapenv:Body></soapenv:Envelope>'
    );
  };

  /** Controllers */
  module.exports.log = function(req, res) {
    try {
      var payload = {request: req.body, headers: req.headers};
      var taxLog = new TaxLog(payload);
      taxLog.save(function(err) {
        if (err) {
          console.log('Error saving db log record', err);
        } else {
          console.log('log record saved to db', req.body);
        }
        sendXML(res, !_.isEmpty(message));
      });
    } catch (e) {
      console.log('Could not save db record', e);
    }
  };

})();
