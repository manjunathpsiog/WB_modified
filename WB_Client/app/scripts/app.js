/// <reference path="directives/genAndView/genAndView.js" />
'use strict';
/**
 * @ngdoc overview
 * @name sbAdminApp
 * @description
 * # sbAdminApp
 *
 * Main module of the application.
 */
angular
    .module('sbAdminApp', [
        'oc.lazyLoad',
        'ui.router',
        'ui.bootstrap',
        'angular-loading-bar',
        'ngRoute',
        'ngCookies',
    ]).run(run)
    .value('config', {
        baseUrl: 'http://192.168.10.147:1337/'
        //baseUrl: 'http://localhost:1337/'
    })

    .config(['$stateProvider', '$urlRouterProvider', '$ocLazyLoadProvider', function ($stateProvider, $urlRouterProvider, $ocLazyLoadProvider) {

        $ocLazyLoadProvider.config({
            debug: false,
            events: true,
        });

        $urlRouterProvider.otherwise('/auth/login');

        $stateProvider
            .state('dashboard', {
                url: '/dashboard',
                templateUrl: 'views/dashboard/main.html',
                resolve: {
                    loadMyDirectives: function ($ocLazyLoad) {
                        return $ocLazyLoad.load(
                            {
                                name: 'sbAdminApp',
                                files: [
                                    'scripts/directives/header/header.js',
                                    'scripts/directives/header/header-notification/header-notification.js',
                                    'scripts/directives/flowchartdd.js',
                                    'scripts/directives/genAndView/genandview.js',
                                    'scripts/directives/generator/generator.js',
                                    'scripts/slideshowplugin.js',
                                    'scripts/directives/user/User.js',
                                    'scripts/directives/user/authentication.js',
                                    'scripts/directives/user/flash.js'
                                ]
                            }),
                            $ocLazyLoad.load(
                                {
                                    name: 'toggle-switch',
                                    files: ["bower_components/angular-toggle-switch/angular-toggle-switch.min.js",
                                        "bower_components/angular-toggle-switch/angular-toggle-switch.css"
                                    ]
                                }),
                            $ocLazyLoad.load(
                                {
                                    name: 'ngAnimate',
                                    files: ['bower_components/angular-animate/angular-animate.js']
                                })
                        $ocLazyLoad.load(
                            {
                                name: 'ngCookies',
                                files: ['bower_components/angular-cookies/angular-cookies.js']
                            })
                        $ocLazyLoad.load(
                            {
                                name: 'ngResource',
                                files: ['bower_components/angular-resource/angular-resource.js']
                            })
                        $ocLazyLoad.load(
                            {
                                name: 'ngSanitize',
                                files: ['bower_components/angular-sanitize/angular-sanitize.js']
                            })
                        $ocLazyLoad.load(
                            {
                                name: 'ngTouch',
                                files: ['bower_components/angular-touch/angular-touch.js']
                            })
                    }
                }
            })

            .state('auth', {
                url: '/auth',
                templateUrl: 'views/auth/auth.html',
                resolve: {
                    loadMyDirectives: function ($ocLazyLoad) {
                        return $ocLazyLoad.load(
                            {
                                name: 'sbAdminApp',
                                files: [
                                    'scripts/directives/header/header.js',
                                    'scripts/directives/header/header-notification/header-notification.js',
                                    'scripts/directives/flowchartdd.js',
                                    'scripts/directives/genAndView/genandview.js',
                                    'scripts/directives/generator/generator.js',
                                    'scripts/slideshowplugin.js'
                                ]
                            })
                    }
                }
            })
            .state('dashboard.home', {
                url: '/home',
                controller: 'MainCtrl',
                templateUrl: 'views/ui-elements/Home.html',
                resolve: {
                    loadMyFiles: function ($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name: 'sbAdminApp',
                            files: [
                                'scripts/controllers/main.js',
                                'scripts/directives/timeline/timeline.js',
                                'scripts/directives/notifications/notifications.js',
                                'scripts/directives/generator/generator.js',
                                'scripts/directives/genAndView/genandview.js',
                            ]
                        })
                    }
                }
            })
            .state('auth.register', {
                templateUrl: 'views/auth/register.html',
                url: '/register'
            })
            .state('auth.manage', {
                templateUrl: 'views/auth/manage.html',
                url: '/manage'
            })
            .state('auth.login', {
                templateUrl: 'views/auth/login.html',
                url: '/login'
            })
            .state('auth.logout', {
                templateUrl: 'views/auth/logout.html',
                url: '/logout'
            })
            .state('dashboard.CreateFlowChart', {
                templateUrl: 'views/ui-elements/CreateFlowChart.html',
                url: '/CreateFlowChart'
            })
            .state('dashboard.ViewFlowChart', {
                templateUrl: 'views/ui-elements/ViewFlowChart.html',
                url: '/ViewFlowChart'
            })
            .state('dashboard.ModifyFlowChart', {
                templateUrl: 'views/ui-elements/ModifyFlowChart.html',
                url: '/ModifyFlowChart'
            })
            .state('dashboard.DeleteFlowChart', {
                templateUrl: 'views/ui-elements/DeleteFlowChart.html',
                url: '/DeleteFlowChart'
            })
            .state('dashboard.CreateUsability', {
                templateUrl: 'views/ui-elements/CreateUsability.html',
                url: '/CreateUsability'
            })
            .state('dashboard.ViewPresentations', {
                templateUrl: 'views/ui-elements/ViewPresentations.html',
                url: '/ViewPresentation'
            })
            .state('dashboard.generateTests', {
                templateUrl: 'views/pages/generateTests.html',
                url: '/generateTests'
            })
            .state('dashboard.download', {
                templateUrl: 'views/ui-elements/Download.html',
                url: '/download'
            })
    }]);

run.$inject = ['$rootScope', '$location', '$cookies', '$http'];
function run($rootScope, $location, $cookies, $http) {
    // keep user logged in after page refresh
    $rootScope.globals = $cookies.getObject('globals') || {};
    if ($rootScope.globals.currentUser) {
        $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata;
    }

    $rootScope.$on('$locationChangeStart', function (event, next, current) {
        // redirect to login page if not logged in and trying to access a restricted page
        var restrictedPage = $.inArray($location.path(), ['/auth/login', '/auth/register']) === -1;
        var loggedIn = $rootScope.globals.currentUser;
        if (restrictedPage && !loggedIn) {
            $location.path('/auth/login');
        }
    });
}

//Service to Generate all combinations of flows
angular
    .module('sbAdminApp').factory('generatorService', ['$http', 'config', function ($http, config) {
        var data = { name: 'MS' };

        return {
            generateFromXml: function (xmlData) {
                var formData = new FormData();
                //formData.append("xmlData", "DSDS");
                //console.log(xmlData, formData.getAll('xmlData'));
                return $http.post(config.baseUrl + "generateFromXml/", $.param({ 'xmlData': xmlData }), { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } });
            },

            generateFromJson: function (jsonData) {
                //var formData = new FormData(); 
                //formData.append("flowChartID", id);
                return $http.post(config.baseUrl + "generateFromJson/", jsonData, { headers: { 'Content-Type': 'application/json' } });
            },

            getJsonValue: function (id) {
                return $http.get(config.baseUrl + "getFlowChartByID/" + id, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } });
            }


        };
    }]);




