function Ctrl7($scope, parts) {
	$scope.part = parts[0];
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
				return function($scope, iElement, iAttrs, ctrl) {
					var h, w, panelDims;

					$scope.$watch(tAttrs.height, function(value) {
						h = value;
						if (h && w) update(h, w);
					});

					$scope.$watch(tAttrs.width, function(value) {
						w = value;
						if (h && w) update(h, w);
					});


					function update(h, w) {
						iElement.css('height', (h * 20) + 'px');
						iElement.css('width', (w * 20) + 'px');

						// Create one to get size
      					var panel_scope = $scope.$new();
      					transcludeFn(panel_scope, function(clone) {
      						iElement.append(stripWhitespace(clone));
      					});
					}

      				// Just grab the panel element not the whitespace
					function stripWhitespace($el) {
  						for (var i = 0; i < $el.length; i++) {
  							if ($el[i].className && 
  								$el[i].className.indexOf('panel') >= 0) {
  								return $el[i];
  							}
  						}
					}

					// Calculate and create the panels that can fit in the array
					function calculatePanelCount(newDimensions) {
						panelDims = newDimensions;

						var across = Math.floor(w / panelDims.width);
						var hPad = (w % panelDims.width) / 2;
						var down = Math.floor(h / panelDims.height);
						var vPad = (h % panelDims.height) / 2;
						var count = across * down;

						console.log(count);
						iElement.css('padding', (vPad * 20) + 'px 0 0 ' + (hPad * 20) + 'px');

						for (var i = 1; i < count; i++) {
							var panel_scope = $scope.$new();
							transcludeFn(panel_scope, function(clone) {
								iElement.append(stripWhitespace(clone));
							});
						}

						$scope.$broadcast('array:panel-layout', {
							dimensions: panelDims,
							scale: 20
						});
					}

					// Calculate how many will fit
					$scope.$on('panel:value-change', function(e) {
						var pDims = e.targetScope.part.dimensions;
						if (!panelDims || 
								panelDims.height != pDims.height || 
								panelDims.width != pDims.width) {
							calculatePanelCount(pDims);
						}
					});
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
			link: function($scope, el, attrs) {
				$scope.$watch(attrs.part, function(value) {
					$scope.part = value;
					$scope.$emit('panel:value-change');
				});
				$scope.$on('array:panel-layout', function(e, layout) {
					el.css('height', (layout.dimensions.height * layout.scale) + 'px');
					el.css('width', (layout.dimensions.width * layout.scale) + 'px');
					el.addClass('panel');
				});
			}
		}
		return directiveDef;
	}]);