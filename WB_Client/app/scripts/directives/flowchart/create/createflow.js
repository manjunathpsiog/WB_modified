(function () {
    var app = angular.module('Workbench');
    app.controller('flowchartcontroller', function () {
        var vm = this;
        vm.loadgojs = (function () {
            init();
        });
        //vm.text = "mytest";   
        //vm.onloadFun = function () {
        //    alert(00001);
        //}
    });

})();

