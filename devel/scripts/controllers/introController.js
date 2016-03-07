/**
 *  Controller of intro 
 *  @author lukaskalcok@gmail.com
 */
angular
    .module('notesApp')
    .controller("introController", introController);

introController.$inject = ['$scope', '$state', 'authService' ];

function introController($scope, $state, authService ) {
	
	$scope.user = authService.getUser();

	/**
     *  Logs in a $scope.user. Credentials are taken from user data.
     */
    $scope.loginUser = function() {
        authService.authWithPassword($scope.user.loginData).then(
            function(){
                if ($scope.user.authenticated){
                    $state.go('notes');
                } else {
                    // not authenticated :(
                }
            },
            function(){
                // nothing
            })
        ;
    };

}