'use strict';

angular.module('portlandStoreApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('checkOut', {
        url: '/checkOut',
        templateUrl: 'app/checkOut/checkOut.html',
        controller: 'CheckoutCtrl'
      });
  });