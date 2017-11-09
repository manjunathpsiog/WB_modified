angular
    .module('Workbench')
    .factory('deleteChart', deleteChart);

deleteChart.$inject = ['$location', '$rootScope', '$http', 'config', '$state'];
function deleteChart($location, $rootScope, $http, config, $state) {
    var service = {};

    service.dc = dc;
    return service;
    function dc(model) {

    }
}