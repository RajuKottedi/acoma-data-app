angular.module('app')

	.controller('dashboard.controller', ['$scope', '$state', '$http', '$timeout',
		function ($scope, $state, $http, $timeout) {

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

			};

			var setErrorTimer = function (idx) {
				$timeout(function () {
					$scope.alerts[idx] = {};
				}, 5000);
			};

			var hasConnection = function () {
				return navigator && navigator.onLine;
			};

			$scope.alerts = [];

			if ($state.params.alert) {
				$scope.alerts.push($state.params.alert);
			}

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

				var successAlert = {
					display: true,
					statusText: 'This has been synced to the server.',
					type: 'success'
				};

				$scope.alerts = [];

				if (hasConnection()) {

					$scope.previousFinds.forEach(function (find, idx) {

						console.log(find.dateCollected);

						$http({
							url: '/api/finds',
							method: 'POST',
							data: find
						}).then(function (res) {

							$scope.alerts.push(successAlert);

							localStorage.removeItem(find.dateCollected.toString());
							$scope.previousFinds.splice(idx);

							setErrorTimer($scope.alerts.length - 1);

						}, function (err) {

							alertTmpl = err && err.data || {};
							alertTmpl.type = 'error';
							alertTmpl.display = true;

							$scope.alerts.push(alertTmpl);

							setErrorTimer($scope.alerts.length - 1);

						});
					});


				} else {

					alertTmpl.statusText = 'Requires internet connection to sync.';
					alertTmpl.type = 'error';
					$scope.alerts.push(alertTmpl);

					setErrorTimer();
				}

			};
		}
	]);