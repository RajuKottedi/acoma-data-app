angular.module('app')

	.controller('dashboard.controller', ['$scope', '$state', function ($scope, $state) {

		$scope.heading = 'Cibola Ceramic Analysis App';

		$scope.previousFinds = [{
			id: '20161231-10:30:23-35.0695-108.8484',
			site: 'Zuni',
			desc: 'information about this',
			date: '11/11/2016'
		}, {
			id: '20161231.10:30:23.35.0695',
			site: 'Zuni',
			desc: 'information masdfa this',
			date: '11/11/2016'
		}, {
			id: '20161231.10:30:23.35.0695',
			site: 'Zuni',
			desc: 'information about this okay',
			date: '11/11/2016'
		}, {
			id: '20161231.10:30:23.35.0695',
			site: 'Zuni',
			desc: 'information about this hi',
			date: '11/11/2016'
		}, {
			id: '20161231.10:30:23.35.0695',
			site: 'Zuni',
			desc: 'information about this hi',
			date: '11/11/2016'
		}, {
			id: '20161231.10:30:23.35.0695',
			site: 'Zuni',
			desc: 'information about this hi',
			date: '11/11/2016'
		}, {
			id: '20161231.10:30:23.35.0695',
			site: 'Zuni',
			desc: 'information about this hi',
			date: '11/11/2016'
		}, {
			id: '20161231.10:30:23.35.0695',
			site: 'Zuni',
			desc: 'information about this hi',
			date: '11/11/2016'
		}, {
			id: '20161231.10:30:23.35.0695',
			site: 'Zuni',
			desc: 'information about this hi',
			date: '11/11/2016'
		}, {
			id: '20161231.10:30:23.35.0695',
			site: 'Zuni',
			desc: 'information about this hi',
			date: '11/11/2016'
		}, {
			id: '20161231.10:30:23.35.0695',
			site: 'Zuni',
			desc: 'information about this hi',
			date: '11/11/2016'
		}];

		$scope.goToNewFind = function () {
			$state.go('newFind');
		};

	}]);