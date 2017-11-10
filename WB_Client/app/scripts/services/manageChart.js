angular
    .module('Workbench')
    .factory('manageChart', manageChart);

manageChart.$inject = ['$location', '$rootScope', '$http', 'config', '$state'];
function manageChart($location, $rootScope, $http, config, $state) {
    
    // Service Reference
    var service = {};
    service.sc = sc;
    service.mc = mc;
    service.dc = dc;
    // service.vc = vc;
    return service;



    // ***** Save the flowchart *****
    
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

    // ***** Modify the flowchart *****

    function mc(model, itemSelected) {
        var flowID = itemSelected.flowChartID
        var data = JSON.parse(model.toJson());
        var flowchartID = "flowChartID"
        data[flowchartID] = flowID;
        var flowchartName = "flowchartName"
        var Email = "Email";
        data[flowchartName] = itemSelected.flowchartName;
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

    //***** Delete the flowchart *****

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
};