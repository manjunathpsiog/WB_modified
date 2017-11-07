angular.module('Workbench')
    .directive('flowchartddl', function ($http, config, $rootScope) {
        return {
            restrict: 'E',
            scope: false,
            template: '<select ng-model="itemSelected" ng-class="selectpicker" class="form-control" ng-options="item as item.flowchartName for item in items track by item.flowChartID"></select>',
            link: function (scope, elem, attr) {               
                $http({
                    method: 'GET',
                    //url: config.baseUrl + 'getFlowChartByEmail/' + $rootScope.globals.currentUser.Email,
                    url: config.baseUrl + 'getFlowchartByEmail/' + $rootScope.globals.currentUser.Email,
                    data: {},
                    headers: {
                        'Content-Type': 'application/json; charset=utf-8'
                    }
                }).then(function successCallback(response) {
                    console.log(response.data);
                    scope.items = response.data.flowchart;
                    scope.itemSelected = response.data.flowchart[0];
                }, function errorCallback(response) {
                    console.log(response.statusText);
                    });

                scope.$watch("itemSelected", function () {
                    scope.ddlValueChanged();
                });
            }
        }
    });