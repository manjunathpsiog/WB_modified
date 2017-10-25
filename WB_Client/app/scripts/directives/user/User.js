(function () {
    'use strict';

    angular
        .module('sbAdminApp')
        .factory('UserService', UserService);

    UserService.$inject = ['$http', 'config'];
    function UserService($http, config) {
        var service = {};

        service.GetAll = GetAll;
        service.GetByEmail = GetByEmail;
        service.Create = Create;
        service.Update = Update;
        service.Delete = Delete;

        return service;

        function GetAll() {
            return $http.get(
                config.baseUrl + 'getAllUsers/'
            ).then(function successCallback(response) {
                return response.data;
            }, function errorCallback(response) {
                return response.data;
            });
        }

        function GetByEmail(Email) {
            return $http.get(
                config.baseUrl + 'getUserByEmail/' + Email
            ).then(function successCallback(response) {
                return response.data;
            }, function errorCallback(response) {
                return response.data;
            });
        }

        function Create(user) {
            return $http.post(
                config.baseUrl + 'addUser/', user
            ).then(function successCallback(response) {
                return response.data;
            }, function errorCallback(response) {
                return response.data;
            });
        }

        function Update(user, Old) {
            return $http.put(
                config.baseUrl + 'updateUserByEmail', user, Old
            ).then(function successCallback(response) {
                return response.data;
            }, function errorCallback(response) {
                return response.data;
            });
        }

        function Delete(Email) {
            console.log(Email);
            return $http.delete(
                config.baseUrl + 'deleteUserByEmail/'+ Email
            ).then(function successCallback(response) {
                console.log(response);
                return response.data;
            }, function errorCallback(response) {
                console.log(response);
                return response.data;
            });
        }

        //// private functions

        //function handleSuccess(res) {
        //    return res.data;
        //}

        //function handleError(error) {
        //    return function () {
        //        return { success: false, message: error };
        //    };
        //}

        function handleSuccess(res) {
            return res.data;
        }

        function handleError(error) {
            return function () {
                return { success: false, message: error };
            };
        }
    }

})();
