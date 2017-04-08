angular.module('app')

	.controller('newFind.controller', ['$scope', '$state', '$timeout', '$http',

		function ($scope, $state, $timeout, $http) {

			var count,

			initialize = function () {

				if (navigator.geolocation) {

					navigator.geolocation.getCurrentPosition(function (position) {

						$scope.formData.lat = position.coords.latitude;
						$scope.formData.lng = position.coords.longitude;

					}, function (err) {
						console.log(err);
					});
				}
			};

			$scope.heading = 'Back to Dashboard';

			$scope.transmitting = false;

			$scope.formData = {};

			//put this in a config file (JSON)
			$scope.questions = [];

			$http.get('./config/questions.json').then(function (res) {
				$scope.questions = res.data;
			}, function (err) {
				console.log(err);
				$scope.questions = [];
			});

			//need to add rounding
			$scope.formatAverage = function (val1, val2, val3) {
				return (((val1 ? val1 : 0) + (val2 ? val2 : 0) + (val3 ? val3 : 0)) / 3).toFixed(2);
			};

			$scope.backAction = function () {
				$state.go('dashboard');
			};

			$scope.submit = function () {

				var d = new Date();

				$scope.formData.dateCollected = d;

				$scope.findId = $scope.formData.SID + '' + $scope.formData.dateCollected;

				$scope.transmitting = true;

				$http.post('/api/finds', $scope.formData).then(function (res) {
										
					$scope.transmitting = false;
					
					$scope.saveAlert = {
						display: true,
						message: 'Successfully saved at ' + d.toTimeString(),
						type: 'success'
					};
						
				}, function (err) {

					$scope.transmitting = false;

					$scope.saveAlert = {
						display: true,
						message: err.statusText,
						type: 'error'
					};

				});

			};

			$scope.cancel = function () {

				//possibly pop a confirmation window for this
				$scope.formData = {};
				$state.go('dashboard');
			};

			initialize();
		}
	]);