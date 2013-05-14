function Ctrl5($scope) {
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
}

angular.module('solar', [])
	.directive('part', function() {
		return function(scope, el, attrs) {
			function updateSrc(value) {
				el[0].src = 'img/' + value.part + '/' + value.supplier + '.svg';
			}

			scope.$watch(attrs.part, function(value) {
				updateSrc(value);
			});
		}
	});