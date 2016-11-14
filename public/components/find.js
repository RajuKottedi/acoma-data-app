angular.module('app.components')

	.directive('find', function () {

		return {
			restrict: 'A',
			replace: false,
			scope: { find: '=' },
			templateUrl: 'components/find.html'
		};

	});