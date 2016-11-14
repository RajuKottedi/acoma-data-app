angular.module('app', ['app.core', 'app.layout']).config(config);

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
}