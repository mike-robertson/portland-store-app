'use strict';

angular.module('portlandStoreApp')
  .controller('MainCtrl', function ($scope, $http, socket, productInfoService) {
    $scope.products = [];
    $scope.newProduct = {
      name: '',
      info: '',
      price: ''
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
      $scope.newProduct = '';
    };

    $scope.deleteProduct = function(product) {
      $http.delete('/api/products/' + product._id);
    };

    // We set this so that we can use it in our product info page.
    $scope.setProductId = function(productId) {
      productInfoService.setProductId(productId);
    };

    // Take care of our socket if the scope is destroyed.
    $scope.$on('$destroy', function () {
      socket.unsyncUpdates('product');
    });
  });
