function CoderCtrl($scope) {
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
	.directive('coder', function() {
		var directiveDef = {
			restrict: 'E',
			replace: true,
			template: '<div style="border: 1px solid black; width: 300px; height: 300px"></div>',
			link: function(scope, el, attrs) {
				var output = "function Ctrl2($scope) {\
					$scope.parts = [\
						{\
							part: 'panel',\
							supplier: 'Suntech'\
						},\
						{\
							part: 'panel',\
							supplier: 'Yingli'\
						},\
						{\
							part: 'panel',\
							supplier: 'First Solar'\
						},\
						{\
							part: 'inverter',\
							supplier: 'Enphase'\
						}\
					];\
				}\
				";
				var oIndex = 0;

				function keyPressHandler(evt) {
					var code = evt.keyCode;
					console.log(code);
					if ((code > 96 && code < 122) || (code > 64 && code < 91)) {
						el.append(output.charAt(oIndex++));
					}
				}

				document.onkeypress = keyPressHandler;
			}
		}
		return directiveDef;
	});