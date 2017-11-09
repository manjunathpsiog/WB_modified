(function () {
    var app = angular.module('Workbench');
    app.controller('flowchartcontroller', function () {
        var vm = this;
        vm.loadgojs = (function () {
            init();
        });
    });
})();

