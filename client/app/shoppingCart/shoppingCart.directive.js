'use strict';

angular.module('portlandStoreApp')
  .directive('shoppingCart', function () {
    return {
      templateUrl: 'app/shoppingCart/shoppingCart.directive.html',
      restrict: 'EA',
      controller: 'ShoppingCartCtrl',
      scope: {}
    };
  });