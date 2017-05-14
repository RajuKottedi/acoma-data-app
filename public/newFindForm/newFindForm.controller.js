angular.module('app')

	.controller('newFindForm.controller', ['$scope', '$state', '$timeout', '$http',

		function ($scope, $state, $timeout, $http) {

			var count,

			initialize = function () {

				if (navigator.geolocation) {

					navigator.geolocation.getCurrentPosition(function (position) {

						$scope.formData.location = {};
						$scope.formData.location.lat = position && position.coords && position.coords.latitude;
						$scope.formData.location.lng = position && position.coords && position.coords.longitude;

					}, function (err) {
						console.log(err);
					});
				}
			};

			var formatFormData = function (fd) {

				var obj = {};

				for (var prop in fd) {
					if (fd.hasOwnProperty(prop)) {
						obj[prop] = fd[prop].value || fd[prop];
					}
				}

				return obj;

			};

			$scope.heading = 'Back to Dashboard';

			$scope.transmitting = false;

			$scope.formData = {};

			//put this in a config file (JSON)
			$scope.questions = [];

			//Move these to a database if other question sets are needed
			$http.get('./config/questions.json').then(function (res) {
				$scope.questions = res.data;
			}, function (err) {
				//console.log(err);
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

				var stringCopy = '',
					successAlert = {
						display: true,
						statusText: 'This has been saved to localStorage.',
						type: 'success'
					},
					formData = formatFormData($scope.formData);

				formData.dateCollected = Date.now();
				
				// $scope.formData.findId = $scope.formData.dateCollected + '_' + $scope.formData.location.lat + '_' + $scope.formData.location.lng;
				$scope.transmitting = true;

				try {
					stringCopy = JSON.stringify(formData);
				} catch (err) {

					$scope.saveAlert = {
						display: true,
						message: err || 'Could not stringify this data',
						type: 'error'
					};

					$scope.transmitting = false;
					return;
				}

				localStorage[formData.dateCollected.toString()] = stringCopy;

				$scope.transmitting = false;

				$state.go('dashboard', { alert: successAlert });

			};

			$scope.cancel = function () {

				//possibly pop a confirmation window for this
				$scope.formData = {};
				$state.go('dashboard');
			};

			//initialize();
		}
	]);