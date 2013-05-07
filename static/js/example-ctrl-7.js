function Ctrl7($scope, parts) {
	$scope.part = parts[1];
}

angular.module('solar', [])
	.factory('parts', function() {
		return [
			{
				part: 'panel',
				supplier: 'Suntech',
				dimensions: {
					height: 5,
					width: 3
				}
			},
			{
				part: 'panel',
				supplier: 'Yingli',
				dimensions: {
					height: 3,
					width: 5
				}
			},
			{
				part: 'panel',
				supplier: 'First Solar',
				dimensions: {
					height: 4,
					width: 8
				}
			},
			{
				part: 'inverter',
				supplier: 'Enphase'
			}
		];
	})
	.directive('solararray', function() {
		var directiveDef = {

			restrict: 'E',
			replace: true,
			template: '<div class="array"/>',
			transclude: true,
			compile: function(tElement, tAttrs, transcludeFn) {
				return function(scope, iElement, iAttrs, ctrl) {
					var h, w;

					scope.$watch(tAttrs.height, function(value) {
						h = value;
						if (h && w) update(h, w);
					});

					scope.$watch(tAttrs.width, function(value) {
						w = value;
						if (h && w) update(h, w);
					});

					function update(h, w) {
						console.log("h: " + h + " w: " + w);

						// Create one to get size
      					var child_scope = scope.$new();
      					transcludeFn(child_scope, function(clone) {
      						
      						// Just grab the panel element not the whitespace
      						var panelEl;
      						for (var i = 0; i < clone.length; i++) {
      							if (clone[i].className && 
      								clone[i].className.indexOf('panel') >= 0) {
      								panelEl = clone[i];
      								break;
      							}
      						}

      						iElement.append(panelEl);
      						scope.$on('panel-linked', function(x, y, z) {
      							console.log('stop');
      						});


      						console.log(tElement + iElement + child_scope);

      						console.log('first clone');
      					});

      					// Calculate how many will fit

      					// Create the rest and lay them out

					}
				}
			} 
		}
		return directiveDef;
	})
	.directive('panel', ['$timeout', 'parts', function($timeout, parts) {
		// We can do work in the compile function that will happen 
		// before the parent link function is called, but there is no
		// scope to which we may write.  So making values availabe to 
		// parent directives is effectively impossible without using
		// globals. Even saving data to the DOM element doesn't work 
		// because the cloned element is different.  
		var directiveDef = {
			restrict: 'E',
			replace: true,
			template: '<div class="panel"/>',
			link: function(scope, el, attrs) {
				function updateTmpl(value) {
					el.css('height', value.height);
					el.css('width', value.width);
					scope.$emit('panel-linked', {
						scope: scope,
						height: value.height,
						width: value.width 
					});
				}

				scope.$watch(attrs.part, function(value) {
					updateTmpl(value);
				});
			}
		}
		return directiveDef;
	}]);