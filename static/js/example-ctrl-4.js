function Ctrl4($scope) {
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
			var part = scope.$eval(attrs.part);
			el[0].src = 'img/' + part.part + '/' + part.supplier + '.svg';
		}
	});