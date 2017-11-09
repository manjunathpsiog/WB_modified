/// <reference path="directives/genAndView/genAndView.js" />
'use strict';
angular
    .module('Workbench', [
        'oc.lazyLoad',
        'ui.router',
        'ui.bootstrap',
        'ngSanitize',
        'angular-loading-bar',
        'ngRoute',
        'ngCookies',
    ])
    .value('config', {
        baseUrl: 'http://192.168.10.147:1337/'
        //baseUrl: 'http://192.168.1.6:1337/'
    })

    .config(['$stateProvider', '$urlRouterProvider', '$ocLazyLoadProvider', function ($stateProvider, $urlRouterProvider, $ocLazyLoadProvider, $location) {

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
                                name: 'Workbench',
                                files: [
                                    'scripts/directives/header/header.js',
                                    'scripts/slideshowplugin.js',
                                    'scripts/directives/user/User.js',
                                    'scripts/directives/user/authentication.js',
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
                                name: 'Workbench',
                                files: [
                                    'scripts/directives/header/header.js',
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
                            name: 'Workbench',
                            files: [
                                'scripts/controllers/main.js',
                                'scripts/directives/generator/generator.js',
                                'scripts/directives/genAndView/genandview.js',
                            ]
                        })
                    }
                }
            })
            .state('auth.register', {
                templateUrl: 'views/auth/register.html',
                url: '/register',
                controller: 'registerCtrl'
            })
            .state('auth.manage', {
                templateUrl: 'views/auth/manage.html',
                url: '/manage',
                controller: 'manageCtrl'
            })
            .state('auth.login', {
                templateUrl: 'views/auth/login.html',
                url: '/login',
                controller: 'loginCtrl'
            })
            .state('auth.logout', {
                templateUrl: 'views/auth/logout.html',
                url: '/logout',
                controller: 'logoutCtrl'
            })
            .state('dashboard.CreateFlowChart', {
                templateUrl: 'views/ui-elements/CreateFlowChart.html',
                url: '/CreateFlowChart',
                controller: 'ManageCtrl'
            })
            .state('dashboard.ViewFlowChart', {
                templateUrl: 'views/ui-elements/ViewFlowChart.html',
                url: '/ViewFlowChart',
                controller: 'ManageCtrl'
            })
            .state('dashboard.ModifyFlowChart', {
                templateUrl: 'views/ui-elements/ModifyFlowChart.html',
                url: '/ModifyFlowChart',
                controller: 'ManageCtrl'
            })
            .state('dashboard.DeleteFlowChart', {
                templateUrl: 'views/ui-elements/DeleteFlowChart.html',
                url: '/DeleteFlowChart',
                controller: 'ManageCtrl'
            })
            .state('dashboard.CreateUsability', {
                templateUrl: 'views/ui-elements/CreateUsability.html',
                url: '/CreateUsability',
                controller: 'ManageCtrl'
            })
            .state('dashboard.ViewPresentations', {
                templateUrl: 'views/ui-elements/ViewPresentations.html',
                url: '/ViewPresentation'
            })
            .state('dashboard.generateTests', {
                templateUrl: 'views/pages/generateTests.html',
                url: '/generateTests',
                resolve: {
                    loadMyDirectives: function ($ocLazyLoad) {
                        return $ocLazyLoad.load(
                            {
                                name: 'Workbench',
                                files: [
                                    'https://cdn.datatables.net/v/bs4-4.0.0-beta/jq-3.2.1/jszip-2.5.0/dt-1.10.16/af-2.2.2/b-1.4.2/b-colvis-1.4.2/b-flash-1.4.2/b-html5-1.4.2/b-print-1.4.2/cr-1.4.1/fc-3.2.3/fh-3.1.3/kt-2.3.2/r-2.2.0/rg-1.0.2/rr-1.2.3/sc-1.4.3/sl-1.2.3/datatables.min.css',
                                    'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.26/vfs_fonts.js',
                                    'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.26/pdfmake.min.js',
                                    'https://cdn.datatables.net/v/bs4-4.0.0-beta/jq-3.2.1/jszip-2.5.0/dt-1.10.16/af-2.2.2/b-1.4.2/b-colvis-1.4.2/b-flash-1.4.2/b-html5-1.4.2/b-print-1.4.2/cr-1.4.1/fc-3.2.3/fh-3.1.3/kt-2.3.2/r-2.2.0/rg-1.0.2/rr-1.2.3/sc-1.4.3/sl-1.2.3/datatables.min.js'
                                ]
                            })
                    }
                }
            });
    }])
    .run(run);

run.$inject = ['$rootScope', '$location', '$cookies', '$http', '$state'];
function run($rootScope, $location, $cookies, $http, $state) {
    // keep user logged in after page refresh
    $rootScope.globals = $cookies.getObject('globals') || {};
    if ($rootScope.globals.currentUser) {
        $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata;
    }

    $rootScope.$on('$locationChangeStart', function (event, next, current) {
        // redirect to login page if not logged in and trying to access a restricted page
        var restrictedPage = $.inArray($location.path(), ['/auth/login', '/auth/register', '/auth/logout']) === -1;
        var loggedIn = $rootScope.globals.currentUser;
        if (restrictedPage && !loggedIn) {
            $state.go('auth.login');
        }
    });
}

//Service to Generate all combinations of flows
angular
    .module('Workbench').factory('generatorService', ['$http', 'config', function ($http, config) {
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




