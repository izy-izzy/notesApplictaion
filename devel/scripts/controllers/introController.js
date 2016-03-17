/**
 *  Controller of intro 
 *  @author lukaskalcok@gmail.com
 */
angular
	.module('notesApp')
	.controller("introController", introController);

introController.$inject = ['$scope', '$state', 'authService' ];

function introController($scope, $state, authService ) {

	var vm = this;
	
	vm.user = authService.getUser();

	/**
	 *  Logs in a vm.user. Credentials are taken from user data.
	 */
	$scope.loginUser = function() {
		authService.authWithPassword(vm.user.loginData).then(
			function(){
				if (vm.user.authenticated){
					$state.go('notes');
				} 
			},
			function(){
				// nothing
			})
		;
	};

}