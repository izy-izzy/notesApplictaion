/**
 *  Controller for authentication of a user
 *  @author lukaskalcok@gmail.com
 */
angular
    .module('notesApp')
    .controller("authController", authController);

authController.$inject = ['$scope','databaseService','$state','settingsService','SweetAlert','authService'];

function authController($scope, databaseService, $state, settingsService, SweetAlert, authService) {

    var vm = this;

    $scope.user = authService.getUser();

    /**
     *  Sets database service based on data received from setting service.
     *  Authenticate a user to database.
     *  If initialisation of setting service fails, user is informed.
     */
    vm.loadApplication = function() {
        settingsService.getSettings().then(function(data) {
            vm.settings = data;
            authService.setLocation(vm.settings.fireBaseHttp);
            databaseService.setFirebase(authService.getFirebase());
            vm.getFireBaseAuth();
        }, function(response) {
            SweetAlert.swal({
                title: "Web service initialisation failed.",
                type: "error"
            });
        });
    }

    vm.loadApplication();

    /**
     *  Authenticate a user to database service.
     *  Adds callbvmks for authentication success or fail.
     */
    vm.getFireBaseAuth = function() {
        authService.getAuth().$onAuth(
            function(authData){
                if (authData){
                    if ($state.current.name == 'intro'){
                        $state.go('notes');
                    };
                    authService.loginRoutine(authData);
                } else {
                    $state.go('intro');
                    if ($scope.user.authenticated) {
                        if (!$scope.user.unAuthRequest) {
                            SweetAlert.swal({
                                title: "Your session expired.",
                                type: "warning"
                            });
                        } else {
                            SweetAlert.swal({
                                title: "You have been sucessfully logged out.",
                                type: "success"
                            });
                        }
                    }
                    authService.logoutRoutine();
                }
            }
        );
    };
}
