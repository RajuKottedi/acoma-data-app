angular.module('app', ['app.core', 'app.layout', 'app.components']).config(config);

function config ($urlRouterProvider, $stateProvider) {
	
	$urlRouterProvider.otherwise('/dashboard');

	//Dashboard
	$stateProvider.state('dashboard', {
		url: '/dashboard',
		views: {
			'body@': {
				templateUrl: 'layout/default.tmpl.html',
				controller: 'dashboard.controller'
			},
			'main@dashboard': {
				templateUrl: 'dashboard/dashboard.html'
			}
		}
	});

	//New Find
	$stateProvider.state('newFind', {
		url: '/new-find',
		views: {
			'body@': {
				templateUrl: 'layout/child-default.tmpl.html',
				controller: 'newFindForm.controller'
			},
			'main@newFind': {
				templateUrl: 'newFindForm/new-find-form.html'
			}
		}
	});
}