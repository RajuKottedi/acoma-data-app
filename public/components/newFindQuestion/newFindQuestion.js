angular.module('app.components')

	.directive('newFindQuestion', function () {

		return {
			restrict: 'A',
			// scope: {
			// 	question: '=newFindQuestion',
			// 	calcAvg: '&?'
			// },
			scope: true,
			replace: true,
			templateUrl: 'components/newFindQuestion/question.html',
			controller: ['$scope', function ($scope) {

				// //need to add rounding
				// $scope.formatAverage = function (val1, val2, val3) {
				// 	return (((val1 ? val1 : 0) + (val2 ? val2 : 0) + (val3 ? val3 : 0)) / 3).toFixed(2);
				// };

			}]
		};

	});