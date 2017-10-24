angular.module('sbAdminApp')
    .controller('registerCtrl', function ($location, $scope, $http, config, authentication, UserService) {
        var vm = this;

        vm.login = login;

        (function initController() {
            // reset login status
            authentication.ClearCredentials();
            //console.log("problem from not inside");
        })();

        function login() {
            dataLoading = true;
            authentication.Login(vm.Email, vm.Password, function (response) {
                if (response.success) {
                    console.log("nnananannnan");
                    authentication.SetCredentials(vm.Email, vm.Password);
                    $location.path('/dashboard/home');
                } else {
                    console.log("Error authenticating...");
                    vm.dataLoading = false;
                }
            });
        }

        vm.register = register;

        function register() {
            vm.dataLoading = true;
            UserService.Create(vm.user)
                .then(function (response) {
                    if (response.success) {
                        console.log("Registration successful");
                        $location.path('/auth/login');
                    } else {
                        console.log("Bad Registration");
                        console.log(response.message);
                        vm.dataLoading = false;
                    }
                });
        };
    });

