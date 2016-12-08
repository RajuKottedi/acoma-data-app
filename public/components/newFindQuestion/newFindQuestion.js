angular.module('app.components')

	.directive('newFindQuestion', function () {

		return {
			restrict: 'A',
			scope: { question: '=newFindQuestion' },
			replace: true,
			templateUrl: 'components/newFindQuestion/question.html',
			controller: ['$scope', function ($scope) {
				//console.log($scope.question.options);
			}]
		};

	});