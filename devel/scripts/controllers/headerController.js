/**
 * @ngdoc controller
 * @name notesApp.controller:headerController
 *
 * @description Controlls header
 *
 * @requires notesApp.service:databaseService
 * @requires notesApp.service:settingsService
 * @requires notesApp.service:authService
 * @requires notesApp.service:fileSystemFactory
 */
angular
	.module('notesApp')
	.controller("headerController", headerController);

headerController.$inject = ['$scope', '$state', 'authService', 'databaseService', 'settingsService', 'fileSystemFactory' ];

/**
 * @ngdoc property
 * @name .#user
 * @propertyOf notesApp.controller:headerController
 * @returns {object} {@link notesApp.service:authService#users}
 */

/**
 * @ngdoc property
 * @name .#settings
 * @propertyOf notesApp.controller:headerController
 * @returns {object} {@link notesApp.service:settingsService#settings}
 */

function headerController($scope, $state, authService, databaseService, settingsService, fileSystemFactory ) {

	var vm = this;

	vm.user = authService.getUser();

	vm.settings = undefined;
	settingsService.getSettings().then(function(data){
		vm.settings = data;
	});

	/**
	 * @ngdoc method
	 * @name logoutUser
	 * @methodOf notesApp.controller:headerController
	 * @description request Unauthenticate at {@link notesApp.service:authService}
	 */
	vm.logoutUser = function() {
		authService.unAuth();
	};

	/**
	 * @ngdoc method
	 * @name getUserName
	 * @methodOf notesApp.controller:headerController
	 * @description request full name of currently authorised User at {@link notesApp.service:databaseService}
		 * @returns {string} Full name of user.
	 */
	vm.getUserName = function(){
		return databaseService.getUserFullName(vm.user.uid);
	};

	/**
	 * @ngdoc method
	 * @name getUserPhoto
	 * @methodOf notesApp.controller:headerController
	 * @description Method uses {@link notesApp.service:databaseService} to retrive currently authorised user image.
	 * @returns {string} Path to image file or path to default user image.
	 */
	 vm.getUserPhoto = function(){
 		var imageFileName;
 		if (databaseService.getUser(vm.user.uid) && databaseService.getUser(vm.user.uid).imagefile !== ""){
 			imageFileName = databaseService.getUser(vm.user.uid).imagefile;
 		}
 		return fileSystemFactory.getUserPhoto(imageFileName);
 	};

}
