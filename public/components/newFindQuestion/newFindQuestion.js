angular.module('app.components')

	.directive('newFindQuestion', function () {

		return {
			restrict: 'A',
			scope: {
				question: '=newFindQuestion',
				formData: '='
			},
			scope: true,
			replace: true,
			templateUrl: 'components/newFindQuestion/question.html',
			controller: ['$scope', function ($scope) {
				$scope.formData = $scope.formData || {};
			}]
		};

	});