angular.module('app')

	.controller('dashboard.controller', ['$scope', '$state', '$http', '$timeout',
		function ($scope, $state, $http, $timeout) {

			//fetches all of the finds from localStorage
			var alertTmpl = {},
				fetchAll = function () {
				
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

				$scope.alerts = [];

				if (navigator && navigator.onLine) {

					$scope.previousFinds.forEach(function (find) {

						$http({
							url: '/api/finds',
							method: 'POST',
							data: find
						}).then(function (res) {

							alertTmpl = res && res.data || {};
							alertTmpl.type = 'success';
							$scope.alerts.push(alertTmpl);

							localStorage.removeItem(find.findId);
							$scope.previousFinds.splice(find);
						}, function (err) {

							alertTmpl = err && err.data || {};
							alertTmpl.type = 'error';
							$scope.alerts.push(alertTmpl);

							setErrorTimer();
						});
					});

					// for (var i=0;i<$scope.previousFinds.length;i++) {

					// 	$http({
					// 		url: '/api/finds',
					// 		method: 'POST',
					// 		data: $scope.previousFinds[i] 
					// 	}).then(function (res) {

					// 		alertTmpl = res && res.data || {};
					// 		alertTmpl.type = 'success';
					// 		$scope.alerts.push(alertTmpl);

					// 		localStorage.removeItem($scope.previousFinds[i].findId);
					// 		$scope.previousFinds.splice(i,1);
					// 	}, function (err) {

					// 		alertTmpl = err && err.data || {};
					// 		alertTmpl.type = 'error';
					// 		$scope.alerts.push(alertTmpl);

					// 		setErrorTimer();
					// 	});
					// }


				} else {

					alertTmpl.statusText = 'Requires internet connection to sync.';
					alertTmpl.type = 'error';
					$scope.alerts.push(alertTmpl);

					setErrorTimer();
				}

			};
		}
	]);