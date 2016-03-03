/**
 *  Controller for authentication of a user
 *  @author lukaskalcok@gmail.com
 */
angular
    .module('notesApp')
    .controller("authController", authController);

function authController($scope, databaseService, $state, settingsService, SweetAlert, $firebaseAuth) {

    $scope.firebaseAuth = undefined;

    $scope.user = {
        loginData: {
            email: "",
            password: ""
        },
        uid: "",
        token: "",
        loginFailed: false,
        logoutFailed: false,
        authenticated: false,
        writeEnabled: false,
        unAuthRequest: false
    };

    /**
     *  Sets database service based on data received from setting service.
     *  Authenticate a user to database.
     *  If initialisation of setting service fails, user is informed.
     */
    $scope.loadApplication = function() {
        settingsService.getSettings().then(function(data) {
            $scope.settings = data;
            databaseService.setFirebaseHttp($scope.settings.fireBaseHttp);
            $scope.getFireBaseAuth();
        }, function(response) {
            SweetAlert.swal({
                title: "Web service initialisation failed.",
                type: "error"
            });
        });
    }

    $scope.loadApplication();

    /**
     *  Authenticate a user to database service.
     *  Adds callbacks for authentication success or fail.
     */
    $scope.getFireBaseAuth = function() {
        $scope.firebaseAuth = $firebaseAuth(databaseService.getFirebase());
        $scope.firebaseAuth.$onAuth(function(authData) {
            if (authData != null) {
                $scope.loginRoutine(authData);
            } else {
                $scope.logoutRoutine();
            }
        });
    };

    /**
     *  Sets application to logged / notlogged mode after authentication process. 
     *  If a user is authenticated and his current location is 'intro', user is redirected to notes overview.
     *  @param {object} contains authentication data.
     */
    $scope.loginRoutine = function(authData) {
        $scope.user.uid = authData.uid;
        $scope.user.token = authData.token;
        $scope.user.loginFailed = false;
        $scope.user.authenticated = true;
        $scope.user.loginData.password = "";
        if ($state.current.name === "intro") {
            $state.go('notes');
        }
    }

    /**
     *  Sets application to notlogged mode. 
     *  If user's session expires, user is informed about session expiration.
     *  If a user requested log out, user is informed about logout.
     */
    $scope.logoutRoutine = function() {
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
        $scope.user.unAuthRequest = false;
        $scope.user.authenticated = false;
        $scope.user.uid = "";
        $scope.user.token = "";
        $state.go("intro");
    };

    /**
     *  Logs in a user. Credentials are taken from user data.
     */
    $scope.loginUser = function() {
        $scope.firebaseAuth.$authWithPassword($scope.user.loginData).then(function(authData) {
        }, function(error) {
            $scope.user.loginFailed = true;
        });
    };

    /**
     *  Logs out a user.
     */
    $scope.logoutUser = function() {
        $scope.user.unAuthRequest = true;
        $scope.firebaseAuth.$unauth();
    };

}
