'use strict';
/**
 * @ngdoc function
 * @name Workbench.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the Workbench
 */
angular.module('Workbench')
    .controller('MainCtrl', function ($scope, UserService, authentication, $rootScope) {
        if ($rootScope.globals.currentUser) {
            $scope.data =
                {
                    isLoggedIn: true
                };
            UserService.GetByEmail($rootScope.globals.currentUser.Email)
                .then(function (user) {
                    $scope.FirstName = user["Users"]["0"].FirstName;
                });
        }
        else {
            $scope.data =
                {
                    isLoggedIn: false
                };
        }
    });

