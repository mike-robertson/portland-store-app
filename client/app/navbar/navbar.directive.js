'use strict';

angular.module('portlandStoreApp')
  .directive('navbar', function () {
    return {
      templateUrl: 'app/navbar/navbar.html',
      restrict: 'EA',
      controller: 'NavbarCtrl',
      scope: {}
    };
  });