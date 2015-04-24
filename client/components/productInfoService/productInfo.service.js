/* global io */
'use strict';

angular.module('portlandStoreApp')
  .service('productInfoService', function() {

    var product = {};

    return {
      setProduct: function(p) {
        product = p;
      },

      getProduct: function() {
        return product;
      }
    };

  });
