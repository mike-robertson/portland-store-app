'use strict';

angular.module('portlandStoreApp')
  .controller('CheckoutCtrl', function ($scope, $window) {
    $scope.message = 'Hello';
    $scope.windowSize = $window.innerWidth;

    $scope.isMobile = function() {
      return $scope.windowSize <= 480 ? true : false;
    };
  });
