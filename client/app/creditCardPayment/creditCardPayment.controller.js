'use strict';

angular.module('portlandStoreApp')
  .controller('CreditCardPaymentCtrl', function ($scope, $http, shoppingCartService, $window, Auth) {
    $scope.isSubmitDisabled = false;
    $scope.paymentErrors = '';
    $scope.transactionSuccessful = false;

    $scope.cardRegex = /^(?:3[47]\d|(?:4\d|5[1-5]|65)\d{2}|6011)\d{12}$/;

    $scope.cartSize = shoppingCartService.getCartSize();

    var transaction = {
    	token: '',
    	cost: 0,
    	user: Auth.getCurrentUser(),
    	description : ''
    };

    var stripeResponseHandler = function(status, response) {
		  if (response.error) {
		    $scope.paymentErrors = response.error.message;
		    $scope.isSubmitDisabled = false;
		  } else {
		    transaction.token = response.id;
		    $http.post('/api/payments', transaction)
				  .success(function(data, status, headers, config) {
				  	$scope.transactionSuccessful = true;
				  	resetCardForm();
				  	shoppingCartService.removeAllProducts();
				  })
				  .error(function(data, status, headers, config) {
				  	$scope.paymentErrors = data;
				  });
		  }
    };

    var getShoppingCartCount = function(product) {
      return shoppingCartService.getProducts().reduce(function(count, p) {
        return count + (p._id === product._id);
      }, 0);
    };

    var resetCardForm = function() {
	    $scope.cardNumber = undefined;
	    $scope.cvc = undefined;
	    $scope.expMonth = undefined;
	    $scope.expYear = undefined;
    };

    resetCardForm();

    angular.forEach(shoppingCartService.getUniqueProducts(), function(item, index) {
      transaction.cost += item.price * getShoppingCartCount(item);
      transaction.description += item.name + "|";
    });

  	$scope.submitCreditCard = function() {
  		$scope.isSubmitDisabled = true;

  		console.log(angular.element(document.querySelector('#creditCardForm')));
  		$window.Stripe.card.createToken(angular.element(document.querySelector('#creditCardForm')), stripeResponseHandler);
  	};
  });
