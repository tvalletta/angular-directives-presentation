function Ctrl4($scope) {
	$scope.parts = [
		{
			part: 'panel',
			supplier: 'Suntech'
		},
		{
			part: 'panel',
			supplier: 'Yingli'
		},
		{
			part: 'panel',
			supplier: 'First Solar'
		},
		{
			part: 'inverter',
			supplier: 'Enphase'
		}
	];
}

angular.module('solar', [])
	.directive('part', function() {
		return function(scope, el, attrs) {
			var part = scope.$eval(attrs.part);
			el[0].src = 'img/' + part.part + '/' + part.supplier + '.svg';
		}
	});