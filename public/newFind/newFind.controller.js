angular.module('app')

	.controller('newFind.controller', ['$scope', '$state', '$timeout', '$http',

		function ($scope, $state, $timeout, $http) {

			var count,

			initialize = function () {
				if (navigator.geolocation) {
					navigator.geolocation.getCurrentPosition(function (position) {
						$scope.formData.lat = position.coords.latitude;
						$scope.formData.lng = position.coords.longitude;
					});
				}
			};

			$scope.heading = 'Back to Dashboard';

			$scope.transmitting = false;

			$scope.formData = {};

			//put this in a config file (JSON)
			$scope.data = [];

			$http.get('/config/questions.json').then(function (res) {
				$scope.data = res.data;
				console.log(res);
			}, function (err) {
				console.log(err);
			});

			$scope.backAction = function () {
				$state.go('dashboard');
			};

			$scope.submit = function () {

				var d = new Date();

				console.log($scope.formData);

				$scope.transmitting = true;
				//replace timeout (for example purpose) with call to save to local storage calls here
				$timeout(function () {
					$scope.transmitting = false;
					$scope.saveAlert = {
						display: true,
						message: 'Successfully saved at ' + d.toTimeString()
					};
				}, 1000);
				// $scope.transmitting = false;
			};

			$scope.cancel = function () {

				//possibly pop a confirmation window for this
				$scope.formData = {};
				$state.go('dashboard');
			};

			//initialize();
		}
	]);