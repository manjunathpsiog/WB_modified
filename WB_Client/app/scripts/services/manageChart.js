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
    service.su = su;
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

    // ***** Save usability ***** 
    function su(itemSelected) {
        flowchartID = itemSelected.flowChartID;
        blockID = $scope.blkid;
        var imageCount = finalCords.length;
        var kc = 0;
        for (var i = 0; i < imageCount; i++) {
            var item = { "flowchartID": flowchartID, "blockID": blockID, "FileID": finalCords[i].ImageID, "coordinates": finalCords[i].coordinates };
            var data = angular.toJson(item, true);
            var url = config.baseUrl + 'addCoordinates';
            // console.log("post");
            console.log(JSON.stringify(data));
            $.ajax({
                crossDomain: "true",
                type: "POST",
                url: url,
                data: data,
                cache: false,
                timeout: 50000,
                contentType: "application/json",
                success: function (response) {
                    console.log(response);
                    kc++;
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    console.log('error ' + textStatus + " " + errorThrown);
                }
            });
        }
        document.getElementById("EditScreen").style.zIndex = 0;
        document.getElementById("EditScreen").style.display = "none";
    }

    //***** Delete the flowchart *****

    function dc(model, item) {
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