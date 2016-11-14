angular.module('app', ['app.core', 'app.layout', 'app.components']).config(config);

function config ($urlRouterProvider, $stateProvider) {
	
	$urlRouterProvider.otherwise('/dashboard');

	//Home
	$stateProvider.state('dashboard', {
		url: '/dashboard',
		views: {
			'body@': {
				templateUrl: 'layout/dashboard.tmpl.html',
				controller: 'dashboard.controller'
			},
			'main@dashboard': {
				templateUrl: 'dashboard/dashboard.html'
			}
		}
	});

	//Home
	$stateProvider.state('newFind', {
		url: '/new-find',
		views: {
			'body@': {
				templateUrl: 'layout/dashboard.tmpl.html',
				controller: 'newFind.controller'
			},
			'main@newFind': {
				templateUrl: 'newFind/new-find.html'
			}
		}
	});
}