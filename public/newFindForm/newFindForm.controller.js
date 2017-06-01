angular.module('app')

	.controller('newFindForm.controller', ['$scope', '$state', '$timeout', '$http',

		function ($scope, $state, $timeout, $http) {

			var count;

			var formatFormData = function (fd) {

				var obj = {};

				for (var prop in fd) {
					if (fd.hasOwnProperty(prop)) {
						obj[prop] = (fd[prop] && typeof fd[prop].value !== "undefined") ? fd[prop].value : fd[prop];
					}
				}

				return obj;



			};

			//todo - this is awful
			var formatAverage = function (values) {
				
				var avg = 0;

				for (var i=0;i<values.length;++i) {
					avg += values[i] ? values[i] : 0;
				}

				avg = avg / values.length;

				return avg; //(((val1 ? val1 : 0) + (val2 ? val2 : 0) + (val3 ? val3 : 0)) / 3).toFixed(2);
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

			//todo - this is also awful
			$scope.updateAvg = function (questionId) {
				
				var values = [];

				for (var i=0;i<arguments.length;++i) {
					values.push(arguments[i]);
				}
				
				$scope.formData[questionId] = formatAverage(values.slice(1));
				
				for (var i=1;i<values.length;++i) {
					$scope.formData[questionId.replace('Avg', i.toString())] = (values[i] || 0);
				}
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
		}
	]);