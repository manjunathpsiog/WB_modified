angular
    .module('Workbench')
    .factory('modifyChart', modifyChart);

modifyChart.$inject = ['$location', '$rootScope', '$http', 'config', '$state'];
function modifyChart($location, $rootScope, $http, config, $state) {
    var service = {};

    service.mc = mc;
    return service;
    function mc(model) {
        var flowID = $scope.itemSelected.flowChartID
        var data = JSON.parse(model.toJson());
        var flowchartID = "flowChartID"
        data[flowchartID] = flowID;
        var flowchartName = "flowchartName"
        var Email = "Email";
        data[flowchartName] = $scope.itemSelected.flowchartName;
        data[Email] = $rootScope.globals.currentUser.Email;

        $http({
            method: 'POST',
            url: config.baseUrl + 'updateFlowchartByID',
            data: data,
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            }
        }).then(function successCallback(response) {
            $scope.employees = response.data;
            location.reload();
        }, function errorCallback(response) {
            console.log(response.statusText);
        });
    }
};