angular.module('app')

	.controller('dashboard.controller', ['$scope', '$state', function ($scope, $state) {

		$scope.heading = 'Cibola Ceramic Analysis App';

		$scope.previousFinds = [{
			id: 'FIND1A2D',
			site: 'Zuni',
			desc: 'information about this',
			date: '11/11/2016'
		}, {
			id: 'FIND2ADE',
			site: 'Zuni',
			desc: 'information masdfa this',
			date: '11/11/2016'
		}, {
			id: 'FIAD2A4E',
			site: 'Zuni',
			desc: 'information about this okay',
			date: '11/11/2016'
		}, {
			id: 'FGGD2A4E',
			site: 'Zuni',
			desc: 'information about this hi',
			date: '11/11/2016'
		}, {
			id: 'FGGD2A4E',
			site: 'Zuni',
			desc: 'information about this hi',
			date: '11/11/2016'
		}, {
			id: 'FGGD2A4E',
			site: 'Zuni',
			desc: 'information about this hi',
			date: '11/11/2016'
		}, {
			id: 'FGGD2A4E',
			site: 'Zuni',
			desc: 'information about this hi',
			date: '11/11/2016'
		}, {
			id: 'FGGD2A4E',
			site: 'Zuni',
			desc: 'information about this hi',
			date: '11/11/2016'
		}, {
			id: 'FGGD2A4E',
			site: 'Zuni',
			desc: 'information about this hi',
			date: '11/11/2016'
		}, {
			id: 'FGGD2A4E',
			site: 'Zuni',
			desc: 'information about this hi',
			date: '11/11/2016'
		}, {
			id: 'FGGD2A4E',
			site: 'Zuni',
			desc: 'information about this hi',
			date: '11/11/2016'
		}];

		$scope.goToNewFind = function () {
			$state.go('newFind');
		};

	}]);