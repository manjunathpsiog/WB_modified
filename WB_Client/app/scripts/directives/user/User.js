﻿(function () {
    'use strict';

    angular
        .module('sbAdminApp')
        .factory('UserService', UserService);

    UserService.$inject = ['$http', 'config'];
    function UserService($http, config) {
        var service = {};

        //service.GetAll = GetAll;
        //service.GetById = GetById;
        service.GetByEmail = GetByEmail;
        service.Create = Create;
        //service.Update = Update;
        //service.Delete = Delete;

        return service;

        //function GetAll() {
        //    return $http.get('/api/users').then(handleSuccess, handleError('Error getting all users'));
        //}

        //function GetById(id) {
        //    return $http.get('/api/users/' + id).then(handleSuccess, handleError('Error getting user by id'));
        //}

        function GetByEmail(Email) {
            return $http.get(config.baseUrl + 'getUserByEmail/' + Email).then(handleSuccess, handleError('Error getting user by username'));
        }

        function Create(user) {
            return $http.post(config.baseUrl + 'addUser', user).then(handleSuccess, handleError('Error creating user'));
        }

        //function Update(user) {
        //    return $http.put('/api/users/' + user.id, user).then(handleSuccess, handleError('Error updating user'));
        //}

        //function Delete(id) {
        //    return $http.delete('/api/users/' + id).then(handleSuccess, handleError('Error deleting user'));
        //}

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
            console.log(res.data);
            return res.data;
        }

        function handleError(error) {
            return function () {
                return { success: false, message: error };
            };
        }
    }

})();