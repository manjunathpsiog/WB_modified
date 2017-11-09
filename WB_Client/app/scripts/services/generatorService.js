angular.module('Workbench')
    .service('generatorService', ['$http', 'config', function ($http, config) {
        var data = { name: 'MS' };
        return {
            generateFromXml: function (xmlData) {
                var formData = new FormData();
                return $http.post(config.baseUrl + "generateFromXml/", $.param({ 'xmlData': xmlData }), { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } });
            },
            generateFromJson: function (jsonData) {
                return $http.post(config.baseUrl + "generateFromJson/", jsonData, { headers: { 'Content-Type': 'application/json' } });
            },
            getJsonValue: function (id) {
                return $http.get(config.baseUrl + "getFlowChartByID/" + id, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } });
            }
        };
    }]);