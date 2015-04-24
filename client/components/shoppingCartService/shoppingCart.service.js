/* global io */
'use strict';

angular.module('portlandStoreApp')
  .service('shoppingCartService', function($rootScope) {

    var products = [];

    return {
      addProduct: function(p) {
        products.push(p);
        $rootScope.$broadcast("shoppingCartUpdated");
        console.log('broadcasted');
      },

      removeProduct: function(p) {
        var index = products.indexOf(p);
        products.splice(index, 1);
        $rootScope.$broadcast("shoppingCartUpdated");
      },

      removeAllInstances: function(p) {
        products = products.filter(function(element){
          return element._id !== p._id;
        });
        console.log('products');
        console.log(products);
        $rootScope.$broadcast("shoppingCartUpdated");
      },

      getProducts: function() {
        return products;
      },

      getUniqueProducts: function() {
        var uniqueProducts = [];
        angular.forEach(products.map(function(e){return e._id;}), function(item, index) {
          if(uniqueProducts.map(function(e){return e._id;}).indexOf(item) === -1) {
            uniqueProducts.push(products[index]);
          }
        });
        return uniqueProducts;
      },

      listenToUpdates: function(callback) {
        $rootScope.$on("shoppingCartUpdated", callback);
      }
    };

  });
