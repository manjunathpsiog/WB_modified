angular.module('sbAdminApp')
    .controller('registerCtrl', function ($location, $scope, $http, config) {
        $scope.saveUser = function () {
            var user = {
                FirstName: $scope.FirstName,
                LastName: $scope.LastName,
                Email: $scope.Email,
                Password: $scope.Password,
            };
            $http({
                method: 'POST',
                url: config.baseUrl + 'addUsers',
                data: user,
                headers: {
                    'Content-Type': 'application/json; charset=utf-8'
                }
            }).then(function successCallback(response, $state) {
                //$location.path("#/dashboard/ModifyFlowChart");
                window.open("#/dashboard/ModifyFlowChart", "_self");
            }, function errorCallback(response) {
                console.log(response.statusText);
            });
        };
    });

