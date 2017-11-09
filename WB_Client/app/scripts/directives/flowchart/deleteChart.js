angular
    .module('Workbench')
    .factory('deleteChart', deleteChart);

deleteChart.$inject = ['$location', '$rootScope', '$http', 'config', '$state'];
function deleteChart($location, $rootScope, $http, config, $state) {
    var service = {};

    service.dc = dc;
    return service;
    function dc(model,item) {
        var flowID = item.flowChartID
        var data = JSON.parse(model.toJson());
        var flowchartID = "flowChartID";
        data[flowchartID] = flowID;
        var flowchartName = "flowchartName";
        var Email = "Email";
        data[flowchartName] = item.flowchartName;
        data[Email] = $rootScope.globals.currentUser.Email;

        $http({
            method: 'DELETE',
            url: config.baseUrl + 'deleteFlowchartByID',
            data: data,
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            }
        }).then(function successCallback(response) {
            console.log(response);
            location.reload();
        }, function errorCallback(response) {
            console.log(response.statusText);
        });
    }
}