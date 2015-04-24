'use strict';

angular.module('portlandStoreApp')
  .controller('MainCtrl', function ($scope, $http, socket, productInfoService, shoppingCartService, Auth) {
    $scope.products = [];
    $scope.newProduct = {
      name: '',
      info: '',
      price: ''
    };

    $scope.isAdmin = Auth.isAdmin;
    $scope.shoppingCart = shoppingCartService.getProducts();

    // Get the list of products from the backend, 
    // then sync using socket.io to update in real time whenever someone makes a change.
    $http.get('/api/products').success(function(products) {
      $scope.products = products;
      socket.syncUpdates('product', $scope.products);
    });

    $scope.addProduct = function() {
      if($scope.newProduct.name === '' || $scope.newProduct.price == '') {
        return;
      }
      $http.post('/api/products', $scope.newProduct);
      $scope.newProduct = {};
    };

    $scope.deleteProduct = function(product) {
      $http.delete('/api/products/' + product._id);
    };

    // We set this so that we can use it in our product info page.
    $scope.setProduct = function(product) {
      productInfoService.setProduct(product);
    };

    $scope.addToShoppingCart = function(product) {
      shoppingCartService.addProduct(product);
      $scope.shoppingCart = shoppingCartService.getProducts();
    };

    $scope.removeItemFromShoppingCart = function(product) {
      shoppingCartService.removeProduct(product);
      $scope.shoppingCart = shoppingCartService.getProducts();
    };

    $scope.getShoppingCartCount = function(product) {
      return $scope.shoppingCart.reduce(function(count, p) {
        return count + (p._id === product._id);
      }, 0);
    };

    // Take care of our socket if the scope is destroyed.
    $scope.$on('$destroy', function () {
      socket.unsyncUpdates('product');
    });
  });
