angular
    .module('Workbench')
    .factory('saveChart', saveChart);

saveChart.$inject = ['$location', '$rootScope', '$http', 'config', '$state'];
function saveChart($location, $rootScope, $http, config, $state) {
    var service = {};

    service.sc = sc;
    return service;
    function sc(model) {
        var myGuid = GUID();
        GUID.register(myGuid);
        var data = JSON.parse(model.toJson());
        var flowchartID = "flowChartID"
        data[flowchartID] = myGuid;
        var flowchartName = "flowchartName"
        data[flowchartName] = $("#txtFileName").val();
        var Email = "Email";
        data[Email] = $rootScope.globals.currentUser.Email;

        $http({
            method: 'POST',
            url: config.baseUrl + 'addFlowchart',
            data: data,
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            }
        }).then(function successCallback(response) {
            //alert(JSON.stringify($scope.employees));
            //$location.path("#/dashboard/ModifyFlowChart");
            $state.go("dashboard.ModifyFlowChart");
        }, function errorCallback(response) {
            console.log(response.statusText);
        });
    }
};