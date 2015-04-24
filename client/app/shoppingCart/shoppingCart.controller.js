'use strict';

angular.module('portlandStoreApp')
  .controller('ShoppingCartCtrl', function ($scope, $http, socket, shoppingCartService) {
    $scope.shoppingCartProducts = [];
    $scope.totalPrice = 0;
    
    $scope.removeFromShoppingCart = function(product) {
      shoppingCartService.removeAllInstances(product);
      //$http.get('/api/products/ids/' + shoppingCartService.getProducts().map(function(e){return e._id}).join(",")).success(function(products) {
        $scope.shoppingCartProducts = shoppingCartService.getUniqueProducts();
      //});
    };

    $scope.getShoppingCartCount = function(product) {
      return shoppingCartService.getProducts().reduce(function(count, p) {
        return count + (p._id === product._id);
      }, 0);
    };
    // Get the product equal to the product id we set in productInfo.service
    // $http.get('/api/products/ids/' + shoppingCartService.getProducts().map(function(e){return e._id}).join(",")).success(function(products) {
    $scope.shoppingCartProducts = shoppingCartService.getUniqueProducts();
    console.log('getting unique products');
    console.log(shoppingCartService.getUniqueProducts());
    angular.forEach($scope.shoppingCartProducts, function(item, index) {
      $scope.totalPrice += item.price * $scope.getShoppingCartCount(item);
    });
    // })
    // .error(function(data, status, headers, config) {
    //   console.log('failed to load shopping cart');
    // });

    //we want to listen to updates for the same page shopping cart directive
    shoppingCartService.listenToUpdates(function() {
      if(shoppingCartService.getProducts().length > 0) {
        // $http.get('/api/products/ids/' + shoppingCartService.getProducts().map(function(e){return e._id}).join(","))
        // .success(function(products) {
          $scope.totalPrice = 0;
          $scope.shoppingCartProducts = shoppingCartService.getUniqueProducts();
          angular.forEach($scope.shoppingCartProducts, function(item, index) {
            $scope.totalPrice += item.price * $scope.getShoppingCartCount(item);
          });
        // })
      } else {
        $scope.totalPrice = 0;
        $scope.shoppingCartProducts = [];
      }
    });

  });
