angular.module('app')

	.controller('dashboard.controller', ['$scope', '$state', '$http', '$timeout',
		function ($scope, $state, $http, $timeout) {

			//fetches all of the finds from localStorage
			var fetchAll = function () {
				
					var finds = [];

					if (localStorage.length === 0) {
						return [];
					}

					for (var i=0;i<localStorage.length;i++) {
						
						try {
							finds.push(JSON.parse(localStorage.getItem(localStorage.key(i))));
						} catch (err) {
							console.log(err);
						}

					}

					return finds;

				},

				setErrorTimer = function () {
					$timeout(function () {
						$scope.errorMessage = '';
					}, 5000);
				};

			$scope.alert = $state.params.alert || {};

			$scope.heading = 'Cibola Ceramic Analysis';

			$scope.query = { value: '' };

			// $scope.updateParent = function (query) {
			// 	$scope.query = query;
			// };

			$scope.goToNewFind = function () {
				$state.go('newFind');
			};

			$scope.previousFinds = fetchAll();

			$scope.sync = function () {

				if (navigator && navigator.onLine) {

					$http.post('/api/finds').then(function (res) {
						console.debug(res);
					}, function (err) {
						$scope.alert = err && err.data;
						setErrorTimer();
					});

				} else {

					$scope.alert.statusText = 'Requires internet connection to sync.';
					setErrorTimer();
				}

			};
		}
	]);