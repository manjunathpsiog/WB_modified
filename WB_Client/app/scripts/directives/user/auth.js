angular.module('Workbench')
    .controller('loginCtrl', function ($location, $scope, $rootScope, authentication, UserService, FlashService) {
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
                console.log(typeof (response));
                if (response == "success") {
                    authentication.SetCredentials(vm.Email, vm.Password);
                    $location.path('/dashboard/home');
                } else {
                    $scope.iferror = true;
                    $scope.error = "The Username or the password is incorrect";
                    vm.dataLoading = false;
                }
            });
        }
    });
angular.module('Workbench')
    .controller('registerCtrl', function ($location, $rootScope, authentication, UserService) {
        var vm = this
        vm.register = register;

        function register() {
            vm.dataLoading = true;
            UserService.Create(vm.user)
                .then(function (response) {
                    console.log(vm.user);
                    if (response == "Saved Successfully") {
                        console.log("Registration successful");
                        $location.path('/auth/login');
                    } else {
                        console.log(response);
                        vm.dataLoading = false;
                    }
                });
        };
    });
angular.module('Workbench')
    .controller('manageCtrl', function ($location, $scope, $rootScope, authentication, UserService, FlashService) {

        var vm = this;

        vm.user = null;
        vm.allUsers = [];
        vm.deleteProfile = deleteProfile;
        vm.updateProfile = updateProfile;

        initController();

        function initController() {
            loadCurrentUser();
            loadAllUsers();
        }

        function loadCurrentUser() {
            UserService.GetByEmail($rootScope.globals.currentUser.Email)
                .then(function (user) {
                    $scope.Email = user["Users"]["0"].Email;
                    $scope.FirstName = user["Users"]["0"].FirstName;
                    $scope.LastName = user["Users"]["0"].LastName;
                    $scope.Password = user["Users"]["0"].Password;
                    $rootScope.FirstName = user["Users"]["0"].FirstName
                });
        }

        function loadAllUsers() {
            UserService.GetAll()
                .then(function (users) {
                    vm.allUsers = users;
                });
        }

        function deleteProfile() {
            UserService.Delete($rootScope.globals.currentUser.Email)
                .then(function () {
                    authentication.ClearCredentials();
                    $location.path('/auth/logout');
                });
        }

        function updateProfile() {
            if (vm.user == null)
            {
                return;
            }
            console.log(vm.user, $rootScope.globals.currentUser.Email);
            UserService.Update(vm.user, $rootScope.globals.currentUser.Email)
                .then(function () {
                    authentication.SetCredentials(vm.user.Email, vm.user.Password);
                    console.log("Updated");
                });
        }
    });

angular.module('Workbench')
    .controller('logoutCtrl', function ($location, $scope, $rootScope, authentication, $state, $timeout) {
        $timeout(function () {
            $state.go('auth.login');
        }, 3000);

        (function initController() {
            // reset login status
            authentication.ClearCredentials();
            //console.log("problem from not inside");
        })();
    });

