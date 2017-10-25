angular.module('sbAdminApp')
    .controller('registerCtrl', function ($location, $scope, authentication, UserService, FlashService) {
        var vm = this;

        vm.login = login;

        (function initController() {
            // reset login status
            authentication.ClearCredentials();
            //console.log("problem from not inside");
        })();

        function login() {
            console.log(vm.Email);
            console.log(vm.Password);
            vm.dataLoading = true;
            authentication.Login(vm.Email, vm.Password, function (response) {
                console.log(typeof(response));
                if (response == "success") {
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

