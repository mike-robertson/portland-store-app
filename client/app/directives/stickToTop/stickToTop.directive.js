'use strict';

angular.module('portlandStoreApp')
  .directive('stickToTop', function ($window) {
    return {
      restrict: 'A',
      link: function (scope, element, attrs) {
      	var window = angular.element($window),
      			parent = angular.element(element.parent()),
      			currentOffsetTop = element.offset().top,
      			origCss = {
      				position: "static",
      				// width: getParentWidth()
      			};

      	handleSnapping();
      	window.bind('scroll', function() {
      		handleSnapping();
      	});
      	window.bind('resize', function() {
      		element.css({
      			// width: getParentWidth()
      		});
      	});

      	function returnDigit(val) {
      		var re = /\d+/;
      		var digit = val.match(re)[0];
      		return digit
      	}

      	function getParentWidth() { 
      		return returnDigit(parent.css('width')) 
	      		- returnDigit(parent.css('padding-left')) 
	      		- returnDigit(parent.css('padding-right')); 
      	}

      	function handleSnapping() {
      		if(window.scrollTop() > currentOffsetTop) {
      			var headerOffsetTop = 0;
      					element.css({
      						position: "fixed",
      						top: headerOffsetTop + "px",
      						// width: getParentWidth()
      					});
      		} else {
      			element.css(origCss);
      			// element.css({width: getParentWidth()});
      		}
      	}

      }
    };
  });