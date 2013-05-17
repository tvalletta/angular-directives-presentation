function Ctrl6($scope) {
	$scope.partList = [
		{
			type: 'panel',
			supplier: 'Suntech'
		},
		{
			type: 'panel',
			supplier: 'Yingli'
		},
		{
			type: 'panel',
			supplier: 'First Solar'
		},
		{
			type: 'inverter',
			supplier: 'Enphase'
		}
	];
	$scope.addPart = function() {
		$scope.partList.push({
			type: 'panel',
			supplier: 'Random'
		});
	}
	$scope.changeType = function() {
		$scope.partList[0].type = 'inverter';
	}
}

angular.module('solar', [])
	.directive('party', function() {
		var directiveDef = {
			restrict: 'E',
			replace: true,
			template: '<img/>',
			link: function(scope, el, attrs) {
				function updateSrc(value) {
					el.attr('src', 'img/' + value + '.svg');
				}

				scope.$watch('item.type', function(newValue, oldValue) {
					updateSrc(newValue);
				});
			}
		}
		return directiveDef;
	});