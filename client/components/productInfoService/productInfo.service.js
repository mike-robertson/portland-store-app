/* global io */
'use strict';

angular.module('portlandStoreApp')
  .service('productInfoService', function() {

    var productId = '';

    return {
      setProductId: function(id) {
        productId = id;
        console.log(productId);
      },

      getProductId: function() {
        console.log(productId);
        return productId;
      }
    };

  });
