/**
 * @ngdoc controller
 * @name notesApp.controller:introController
 *
 * @description Controlls header
 *
 * @requires notesApp.service:authService
 * @requires SweetAlert
 */
angular
	.module('notesApp')
	.controller("introController", introController);

introController.$inject = ['$scope', '$state', 'authService', 'SweetAlert', 'validationFactory' ];

/**
 * @ngdoc property
 * @name .#user
 * @propertyOf notesApp.controller:introController
 * @returns {object} {@link notesApp.service:authService#users}
 */

function introController($scope, $state, authService, SweetAlert, validationFactory) {

	var vm = this;

	vm.user = authService.getUser();

	/**
	 * @ngdoc method
	 * @name loginUser
	 * @methodOf notesApp.controller:introController
	 * @description Logs in user. Credentials are taken from user data. For authentication uses {@link notesApp.service:authService}.
	 */
	vm.loginUser = function() {
		if (validationFactory.validateName(vm.user.loginData.email)){
			authService.authWithPassword(vm.user.loginData).then(
				function(){
					$state.go('notes');
				},
				function(){
					SweetAlert.swal({
						title: "Unable to authenticate.",
						text: "Login or Password may be wrong",
						type: "error"});
				}
			);
		} else {
			SweetAlert.swal({
				title: "You have to fill in username.",
				type: "warning"});
		}
	};
}
