'use strict';

angular.module('portlandStoreApp')
  .directive('shippingForm', function () {
    return {
      templateUrl: 'app/shippingForm/shippingForm.html',
      restrict: 'EA',
      controller: 'ShippingFormCtrl'
    };
  });