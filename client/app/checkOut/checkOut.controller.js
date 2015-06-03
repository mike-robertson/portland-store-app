'use strict';

angular.module('portlandStoreApp')
  .controller('CheckoutCtrl', function ($scope, $window) {
    $scope.message = 'Hello';
    $scope.windowSize = $window.innerWidth;

  	$scope.showShipping = true;
  	$scope.showCreditCard = false;

  	$scope.toggleShipping = function() {
  		$scope.showShipping = !$scope.showShipping;
  	};

  	$scope.toggleCreditCard = function() {
  		$scope.showCreditCard = !$scope.showCreditCard;
  	};

    $scope.isMobile = function() {
      return $scope.windowSize <= 480 ? true : false;
    };
  });
