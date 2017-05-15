angular.module('app.components')

	.directive('query', function () {
		return {
			restrict: 'A',
			scope: { query: '=', updateParent: '&' },
			replace: true,
			templateUrl: 'components/query/query.html',
			link: function (scope, ele, attrs) {

				scope.displayInput = false;

				//focuses on input when you click magnify
				//todo - should this erase the query?
				scope.focus = function () {
					ele.find('input')[0].focus();
				}
			}
		};
	});