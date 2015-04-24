'use strict';

angular.module('portlandStoreApp')
  .controller('ProductInfoCtrl', function ($scope, $http, socket, productInfoService, Auth) {
    $scope.product = {};
    $scope.comments = [];
    $scope.newComment = {
      name: '',
      info: '',
      product: ''
    };

    $scope.isAdmin = Auth.isAdmin;

    console.log(Auth.isAdmin);
    // Get the product equal to the product id we set in productInfo.service
    $http.get('/api/products/' + productInfoService.getProduct()._id).success(function(product) {
      $scope.product = product;
    });

    // Get the list of comments which have "product" field equal to our product's ID.
    // Then we sync this using a socket so if someone comments, we can see the updates in real time.
    $http.get('/api/comments/productId/'+productInfoService.getProduct()._id).success(function(comments) {      
      $scope.comments = comments;
      socket.syncUpdates('comment', $scope.comments);
      //console.log(products);
    });


    $scope.addComment = function() {
      if($scope.newComment.name === '' || $scope.newComment.info == '') {
        return;
      }

      $scope.newComment.product = productInfoService.getProduct()._id;
      $http.post('/api/comments', $scope.newComment);
      $scope.newComment = '';
    };

    $scope.deleteComment = function(comment) {
      $http.delete('/api/comments/' + comment._id);
    };
  });
