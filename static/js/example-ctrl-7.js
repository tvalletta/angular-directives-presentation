function Ctrl7($scope) {
	$scope.parts = [
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
	$scope.part = $scope.parts[2];
}

angular.module('solar', [])
	.directive('array', function() {
		var directiveDef = {

			restrict: 'E',
			replace: true,
			template: '<div class="array"/>',
			transclude: true,
			compile: function(tElement, tAttrs, transcludeFn) {
				return function(scope, iElement, iAttrs, ctrl) {
					scope.$watch(attrs.part, function(value) {
						console.log(value);

						// Create one to get size
      					var child_scope = scope.$new();
      					transcludeFn(child_scope, function(clone) {
      						console.log('first clone');
      					});

      					// Calculate how many will fit

      					// Create the rest and lay them out

					});
				}
			} 
		}
		return directiveDef;
	});

angular.module('solar', [])
	.directive('panel', function() {
		var directiveDef = {
			restrict: 'E',
			replace: true,
			template: '<div class="panel"/>',
			link: function(scope, el, attrs) {
				function updateTmpl(value) {
					el.css('height', value.height);
					el.css('width', value.width);
				}

				scope.$watch(attrs.part, function(value) {
					updateTmpl(value);
				});
			}
		}
		return directiveDef;
	});