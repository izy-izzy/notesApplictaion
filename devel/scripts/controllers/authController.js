/**
 * @ngdoc controller
 * @name notesApp.controller:authController
 *
 * @description enables adding new note
 *
 * @requires SweetAlert
 * @requires notesApp.service:databaseService
 * @requires notesApp.service:settingsService
 * @requires notesApp.service:authService
 * @requires notesApp.service:fileSystemFactory
 */

angular
	.module('notesApp')
	.controller("authController", authController);

authController.$inject = ['$scope','databaseService','$state','settingsService','SweetAlert','authService', 'fileSystemFactory', 'logService', '$q'];

/**
 * @ngdoc property
 * @name .#user
 * @propertyOf notesApp.controller:authController
 * @returns {object} {@link notesApp.service:authService#users}
 */

function authController($scope, databaseService, $state, settingsService, SweetAlert, authService, fileSystemFactory, logService, $q) {

	var vm = this;

	vm.user = authService.getUser();

	/**
	 * @ngdoc method
	 * @name loadApplication
	 * @methodOf notesApp.controller:authController
	 * @description Sets database service based on data received from setting service. Authenticate a user to database. If initialisation of setting service fails, user is informed.
	 */
	vm.loadApplication = function() {
		settingsService.getSettings().then(function(data) {
			vm.settings = data;
			authService.setLocation(vm.settings.fireBaseHttp);
			fileSystemFactory.setSettings(vm.settings);
			$q.all([
				databaseService.setFirebase(authService.getFirebase()),
				logService.setFirebase(authService.getFirebase())
			]).then(function(){
				vm.getFireBaseAuth();
			}, function(error){
				SweetAlert.swal({
					title: "Initialisation failed",
					text: error,
					type: "error"
				});
			});
		}, function(response) {
			SweetAlert.swal({
				title: "Web service initialisation failed.",
				text: response,
				type: "error"
			});
		});
	};

	vm.loadApplication();

	/**
	 * @ngdoc method
	 * @name getFireBaseAuth
	 * @methodOf notesApp.controller:authController
	 * @description Authenticate a user to database service. Adds callbvmks for authentication success or fail.
	 */
	vm.getFireBaseAuth = function() {
		authService.getAuth( undefined , function(){$state.go('intro')} ).then(
			function(){
				if ($state.current.name === 'intro'){
					$state.go('notes');
				}
			}, function(){
				if (vm.user.authenticated) {
					if (!vm.user.unAuthRequest) {
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
			}
		);
	};
}
