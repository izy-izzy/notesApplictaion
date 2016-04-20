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
 * @requires notesApp.service:validationFactory
  */
angular
	.module('notesApp')
	.controller("userSettingsController", userSettingsController);

userSettingsController.$inject = ['$scope', '$state', 'databaseService', 'authService', 'settingsService', 'fileSystemFactory', 'SweetAlert', 'validationFactory'];

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

function userSettingsController($scope, $state, databaseService, authService, settingsService, fileSystemFactory, SweetAlert, validationFactory) {
	var vm = this;

	//fake user
	vm.firstName = "";
	vm.surName = "";
	vm.oldEmail = "";
	vm.newEmail = "";
	vm.newEmailCheck = "";
	vm.passWord = "";

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
		return fileSystemFactory.getUserPhoto(imageFileName);
	};

	/**
	 * @ngdoc method
	 * @name getImageFile
	 * @methodOf notesApp.controller:userSettingsController
	 * @param {string} fileName image file name
	 * @returns {string} Path to image
	 */
	vm.getImageFile = function(fileName){
		return fileSystemFactory.getUserPhoto(fileName);
	};

	/**
	 * @ngdoc method
	 * @name getUserFirstName
	 * @methodOf notesApp.controller:userSettingsController
	 * @returns {string} User Firs name
	 */
	vm.getUserFirstName = function(){
		return databaseService.getUserFirstName(vm.user.uid);
	};

	/**
	 * @ngdoc method
	 * @name getUserSurName
	 * @methodOf notesApp.controller:userSettingsController
	 * @returns {string} User Surname
	 */
	vm.getUserSurName = function(){
		return databaseService.getUserSurName(vm.user.uid);
	};

	/**
	 * @ngdoc method
	 * @name changeName
	 * @description Saves use name in database according to temporal name in form.
	 * @methodOf notesApp.controller:userSettingsController
	 */
	vm.changeName = function(){
		databaseService.updateUserName(vm.user.uid, vm.firstName, vm.surName);
	};

	/**
	 * @ngdoc method
	 * @name changeUserEmail
	 * @description Set user's email to a new value according to a temporal value from input. If values in field do not match the Alert is shown.
	 * @methodOf notesApp.controller:userSettingsController
	 */
	vm.changeUserEmail = function(){
		if (vm.settings.demo){
			SweetAlert.swal({
				title: "This feature is temporarly disabled",
				text: "Fork this on GitHub and you may use it as you wish. :)",
				type: "info"
			});
		} else {
			if (validationFactory.validateEmail(vm.oldEmail) || validationFactory.validateEmail(vm.newEmail) || validationFactory.validateEmail(vm.newEmailCheck)
				){
				if (vm.newEmail === vm.newEmailCheck){
					databaseService.updateUserEmail(vm.user.uid, vm.oldEmail, vm.newEmail, vm.passWord);
				} else {
					SweetAlert.swal({
						title: "Emails in New Email fields do not match.",
						type: "error"});
				}
			} else {
				SweetAlert.swal({
					title: "Email is not valid.",
					type: "error"});
			}
		}
	};
}
