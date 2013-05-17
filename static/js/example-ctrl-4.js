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
	.directive('part', function() {
		return function(scope, el, attrs) {
			var part = scope.$eval(attrs.part);
			el.attr('src', 'img/' + part.type + '.svg');
		}
	});