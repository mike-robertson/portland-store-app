'use strict';

angular.module('portlandStoreApp')
  .directive('creditCardPayment', function () {
    return {
      templateUrl: 'app/creditCardPayment/creditCardPayment.html',
      restrict: 'EA',
      controller: 'CreditCardPaymentCtrl',
      scope: {}
    };
  });