angular.module('app')

	.controller('newFindForm.controller', ['$scope', '$state', '$timeout', '$http',

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

				var d = new Date(),
					stringCopy = '';

				$scope.formData.dateCollected = d;

				$scope.findId = $scope.formData.SID + '' + $scope.formData.dateCollected;

				$scope.transmitting = true;

				try {
					stringCopy = JSON.stringify($scope.formData);
				} catch (err) {
					console.debug();
					$scope.saveAlert = {
						display: true,
						message: err || 'Could not stringify this data',
						type: 'error'
					};

					$scope.transmitting = false;

					return;
				}

				localStorage.setItem($scope.findId, stringCopy);

					$scope.transmitting = false;

					$scope.saveAlert = {
						display: true,
						message: 'This has been saved to localStorage.',
						type: 'success'
					};



				//todo - this should be moved to sync!
				// $http.post('/api/finds', $scope.formData).then(function (res) {
										
				// 	$scope.transmitting = false;
					
				// 	$scope.saveAlert = {
				// 		display: true,
				// 		message: 'Successfully saved at ' + d.toTimeString(),
				// 		type: 'success'
				// 	};
						
				// }, function (err) {

				// 	$scope.transmitting = false;

				// 	$scope.saveAlert = {
				// 		display: true,
				// 		message: err.statusText,
				// 		type: 'error'
				// 	};

				// });

			};

			$scope.cancel = function () {

				//possibly pop a confirmation window for this
				$scope.formData = {};
				$state.go('dashboard');
			};

			initialize();
		}
	]);