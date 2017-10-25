'use strict';
/**
 * @ngdoc function
 * @name sbAdminApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the sbAdminApp
 */
angular.module('sbAdminApp')
    .controller('MainCtrl', function ($scope, UserService, authentication, $rootScope) {
        if ($rootScope.globals.currentUser) {
            $scope.data =
                {
                    isLoggedIn: true
                }
        }
        else {
            $scope.data =
                {
                    isLoggedIn: false
                }
        }
    });

