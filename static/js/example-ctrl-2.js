function Ctrl2($scope) {
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
}
