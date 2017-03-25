angular.module('app')

	.controller('dashboard.controller', ['$scope', '$state', '$http', function ($scope, $state, $http) {

		$scope.heading = 'Cibola Ceramic Analysis';

		$scope.query = { value: '' };

		$scope.updateParent = function (query) {
			$scope.query = query;
		};

		$scope.previousFinds = [];

		$http.get('/api/finds').then(function (res) {
			$scope.previousFinds = res.data;
		}, function (err) {
			console.log(err);
		});

		$scope.goToNewFind = function () {
			$state.go('newFind');
		};

	}]);