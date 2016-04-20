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

introController.$inject = ['$scope', '$state', 'authService', 'SweetAlert' ];

/**
 * @ngdoc property
 * @name .#user
 * @propertyOf notesApp.controller:introController
 * @returns {object} {@link notesApp.service:authService#users}
 */

function introController($scope, $state, authService, SweetAlert ) {

	var vm = this;

	vm.user = authService.getUser();

	/**
	 * @ngdoc method
	 * @name loginUser
	 * @methodOf notesApp.controller:introController
	 * @description Logs in user. Credentials are taken from user data. For authentication uses {@link notesApp.service:authService}.
	 */
	vm.loginUser = function() {
		authService.authWithPassword(vm.user.loginData).then(
			function(){
				if (vm.user.authenticated){
					$state.go('notes');
				}
			},
			function(){
				SweetAlert.swal({
					title: "Unable to authenticate.",
					text: "Login or Password may be wrong",
					type: "error"});
			})
		;
	};
/*
	vm.sweetTest = function(type){
		switch(type) {
			case "success":
				SweetAlert.swal({
					title: "Swal Title",
					text: "Swal text",
					type: type,
					showCancelButton: true
					});
				break;
			case "warning":
				SweetAlert.swal({
					title: "Swal Title",
					text: "Swal text",
					type: type,
					showCancelButton: true
					});
				break;
			case "error":
				SweetAlert.swal({
					title: "Swal Title",
					text: "Swal text",
					type: type,
					showCancelButton: true
					});
				break;
			case "info":
				SweetAlert.swal({
					title: "Swal Title",
					text: "Swal text",
					type: type,
					showCancelButton: true
					});
				break;
			case "input":
				SweetAlert.swal({
					title: "Swal Title",
					text: "Swal text",
					type: type,
					closeOnConfirm: false,
					showCancelButton: true},
					function(inputValue){
						    SweetAlert.swal.showInputError("You need to write something else! not just "+inputValue);
				            return false;
				       	}
				    );
				break;
		}
	};
	*/
}
