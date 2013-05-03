function Ctrl6($scope) {
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