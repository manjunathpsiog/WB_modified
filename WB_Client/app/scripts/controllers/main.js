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
            UserService.GetByEmail($rootScope.globals.currentUser.Email)
                .then(function (user) {
                    $scope.FirstName = user["Users"]["0"].FirstName;
                });
        }
        else {
            $scope.data =
                {
                    isLoggedIn: false
                }
        }
    });

