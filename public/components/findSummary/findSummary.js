angular.module('app.components')

	.directive('findSummary', function () {

		return {
			restrict: 'A',
			replace: false,
			scope: { find: '=findSummary' },
			templateUrl: 'components/findSummary/find-summary.html'
		};

	});