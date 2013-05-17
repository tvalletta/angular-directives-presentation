function Ctrl7($scope, partList) {
	var i = 0;
	$scope.item = partList[i];
	$scope.height = 24;
	$scope.width = 36;
	$scope.changeHeight = function() {
		$scope.height = 10 + Math.round(Math.random() * 16);
	}
	$scope.changeWidth = function() {
		$scope.width = 15 + Math.round(Math.random() * 25);
	}
	$scope.changePanel = function() {
		$scope.item = partList[(++i % 3)];
	}
}

angular.module('solar', [])
	.factory('partList', function() {
		return [
			{
				type: 'panel',
				supplier: 'Suntech',
				dimensions: {
					height: 5,
					width: 3
				}
			},
			{
				type: 'panel',
				supplier: 'Yingli',
				dimensions: {
					height: 3,
					width: 5
				}
			},
			{
				type: 'panel',
				supplier: 'First Solar',
				dimensions: {
					height: 4,
					width: 8
				}
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

					iAttrs.$observe('height', function(value) {
						h = value;
						if (h && w) update(h, w);
					});

					iAttrs.$observe('width', function(value) {
						w = value;
						if (h && w) update(h, w);
					});


					function update(h, w) {
						panelDims = false;
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

						for (var i = 0; i < count; i++) {
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
							iElement.children().remove();
							calculatePanelCount(pDims);
						}
					});
				}
			} 
		}
		return directiveDef;
	})
	.directive('panel', ['$timeout', function($timeout) {
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