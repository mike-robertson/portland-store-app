'use strict';

angular.module('portlandStoreApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('productInfo', {
        url: '/productInfo',
        templateUrl: 'app/productInfo/productInfo.html',
        controller: 'ProductInfoCtrl'
      });
  });