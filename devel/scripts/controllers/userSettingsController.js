/**
 * @ngdoc controller
 * @name notesApp.controller:userSettingsController
 *
 * @description Controlls header
 *
 * @requires SweetAlert
 * @requires notesApp.service:authService
 * @requires notesApp.service:databaseService
 * @requires notesApp.service:settingsService
 * @requires notesApp.service:fileSystemFactory
 */
angular
	.module('notesApp')
	.controller("userSettingsController", userSettingsController);

userSettingsController.$inject = ['$scope', '$state', 'databaseService', 'authService', 'settingsService', 'fileSystemFactory'];

/**
 * @ngdoc property
 * @name .#user
 * @propertyOf notesApp.controller:userSettingsController
 * @returns {object} {@link notesApp.service:databaseService#user}
 */

/**
 * @ngdoc property
 * @name .#settings
 * @propertyOf notesApp.controller:userSettingsController
 * @returns {object} {@link notesApp.service:settingsService#settings}
 */

function userSettingsController($scope, $state, databaseService, authService, settingsService, fileSystemFactory) {
	var vm = this;

	vm.user = authService.getUser();

	vm.settings = undefined;
	settingsService.getSettings().then(function(data){
		vm.settings = data;
	});

	/**
	 * @ngdoc method
	 * @name getUserName
	 * @methodOf notesApp.controller:userSettingsController
	 * @returns {string} Full name of note author
	 */
	vm.getUserName = function(){
		return databaseService.getUserFullName(vm.user.uid);
	};

	/**
	 * @ngdoc method
	 * @name getUserPhoto
	 * @methodOf notesApp.controller:userSettingsController
	 * @returns {string} Path to image of author avatar
	 */
	vm.getUserPhoto = function(){
		var imageFileName;
		if (databaseService.getUser(vm.user.uid) && databaseService.getUser(vm.user.uid).imagefile !== ""){
			imageFileName = databaseService.getUser(vm.user.uid).imagefile;
		}
		fileSystemFactory.getUserPhoto(imageFileName);
	};
}
