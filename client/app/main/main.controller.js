'use strict';

angular.module('portlandStoreApp')
  .controller('MainCtrl', function ($scope, $http, socket, productInfoService, shoppingCartService, Auth, $window) {
    $scope.products = [];
    $scope.newProduct = {
      name: '',
      info: '',
      price: ''
    };

    $scope.isAdmin = Auth.isAdmin;
    $scope.shoppingCart = shoppingCartService.getProducts();

    $scope.windowSize = $window.innerWidth;

    $scope.isMobile = function() {
      return $scope.windowSize <= 480 ? true : false;
    };

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
    };

    $scope.removeItemFromShoppingCart = function(product) {
      shoppingCartService.removeProduct(product);
    };

    $scope.getShoppingCartCount = function(product) {
      return $scope.shoppingCart.reduce(function(count, p) {
        return count + (p._id === product._id);
      }, 0);
    };
    
    //we want to listen to updates on the shopping cart from the directive and update the list if they delete an item
    // Also, each time we add or subtract an item from the shopping cart, it will call the callback (since it receives a broadcast).
    shoppingCartService.listenToUpdates(function() {
      $scope.shoppingCart = shoppingCartService.getProducts();
    });

    // Take care of our socket if the scope is destroyed.
    $scope.$on('$destroy', function () {
      socket.unsyncUpdates('product');
    });
  });
