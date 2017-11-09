angular.module("Workbench")
.directive("sortable", function () {
    return {
        restrict: "C",
        link: function (scope, element, attrs) {
            element.sortable();
        }
    }
})