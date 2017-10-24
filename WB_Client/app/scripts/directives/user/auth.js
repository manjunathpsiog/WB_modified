angular.module('sbAdminApp')
    .controller('registerCtrl', function ($location, $rootScope, authentication, UserService, FlashService) {
        var vm = this;

        vm.login = login;

        (function initController() {
            // reset login status
            authentication.ClearCredentials();
            //console.log("problem from not inside");
        })();

        function login() {
            vm.dataLoading = true;
            authentication.Login(vm.Email, vm.Password, function (response) {
                if (response == "Saved Successfully") {
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
                    if (response == "Saved Successfully") {
                        FlashService.Success('Registration successful', true);
                        console.log("Registration successful");
                        $location.path('/auth/login');
                    } else {
                        console.log(response);
                        vm.dataLoading = false;
                    }
                });
        };
    });

