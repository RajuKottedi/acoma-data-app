angular.module('app')

	.controller('dashboard.controller', ['$scope', '$state', function ($scope, $state) {

		$scope.heading = 'Cibola Ceramic Analysis';

		$scope.query = { value: '' };

		$scope.updateParent = function (query) {
			$scope.query = query;
		};

		$scope.previousFinds = [{
			id: '20161231-10',
			site: 'Zuni',
			desc: 'information about this',
			date: '11/11/2016'
		}, {
			id: '20161231.10',
			site: 'Zuni',
			desc: 'information masdfa this',
			date: '11/11/2016'
		}, {
			id: '20161231.10',
			site: 'Chaco',
			desc: 'information about this okay',
			date: '11/11/2016'
		}, {
			id: '20161231.10',
			site: 'Chaco',
			desc: 'information about this hi',
			date: '11/11/2016'
		}, {
			id: '20161231.10',
			site: 'Clearwater',
			desc: 'information about this hi',
			date: '11/11/2016'
		}, {
			id: '20161231.10',
			site: 'Clearwater',
			desc: 'information about this hi',
			date: '11/11/2016'
		}, {
			id: '20161231.10',
			site: 'Zuni',
			desc: 'information about this hi',
			date: '11/11/2016'
		}, {
			id: '20161231.10',
			site: 'Clearwater',
			desc: 'information about this hi',
			date: '11/11/2016'
		}, {
			id: '20161231.10',
			site: 'Zuni',
			desc: 'information about this hi',
			date: '11/11/2016'
		}, {
			id: '20161231.10',
			site: 'Chaco',
			desc: 'information about this hi',
			date: '11/11/2016'
		}, {
			id: '20161231.10',
			site: 'Zuni',
			desc: 'information about this hi',
			date: '11/11/2016'
		}, {
			id: '20161231.10',
			site: 'Zuni',
			desc: 'information about this hi',
			date: '11/11/2016'
		}, {
			id: '20161231.10',
			site: 'Zuni',
			desc: 'information about this hi',
			date: '11/11/2016'
		}, {
			id: '20161231.10',
			site: 'Zuni',
			desc: 'information about this hi',
			date: '11/11/2016'
		}, {
			id: '20161231.10',
			site: 'Example',
			desc: 'information about this hi',
			date: '11/11/2016'
		}, {
			id: '20161231.10',
			site: 'Example',
			desc: 'information about this hi',
			date: '11/11/2016'
		}, {
			id: '20161231.10',
			site: 'Example',
			desc: 'information about this hi',
			date: '11/11/2016'
		}, {
			id: '20161231.10',
			site: 'Example',
			desc: 'information about this hi',
			date: '11/11/2016'
		}];

		$scope.goToNewFind = function () {
			$state.go('newFind');
		};

	}]);