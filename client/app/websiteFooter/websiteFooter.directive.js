'use strict';

angular.module('portlandStoreApp')
  .directive('websiteFooter', function () {
    return {
      templateUrl: 'app/websiteFooter/websiteFooter.html',
      restrict: 'EA'
    };
  });