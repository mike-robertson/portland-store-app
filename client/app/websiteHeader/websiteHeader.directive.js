'use strict';

angular.module('portlandStoreApp')
  .directive('websiteHeader', function () {
    return {
      templateUrl: 'app/websiteHeader/websiteHeader.html',
      restrict: 'EA'
    };
  });