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
}

angular.module('solar', [])
	.directive('party', function() {
		var directiveDef = {
			restrict: 'E',
			replace: true,
			template: '<img/>',
			link: function(scope, el, attrs) {
				function updateSrc(value) {
					el[0].src = 'img/' + value.part + '/' + value.supplier + '.svg';
				}

				scope.$watch(attrs.part, function(value) {
					updateSrc(value);
				});
			}
		}
		return directiveDef;
	});