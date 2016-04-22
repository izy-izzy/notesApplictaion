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

	vm.nameChange = {
		firstName : "",
		surName : ""
	}

	vm.email = {
		oldEmail : "",
		newEmail : "",
		newEmailCheck : "",
		passWord : ""
	}

	vm.pass = {
		email : "",
		oldPassWord : "",
		newPassWord : "",
		newPassWordCheck : ""
	}


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
		databaseService.updateUserName(vm.user.uid, vm.nameChange.firstName, vm.nameChange.surName).then(
			function(data){
				SweetAlert.swal({
					title: "User name has been changed to: " + data.firstname + data.surname,
					type: "success"
				});
			},
			function(error){
				SweetAlert.swal({
					title: "User name could not be changed.",
					text: error,
					type: "error"
				});
			}
		);
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
			if (validationFactory.validateEmail(vm.email.oldEmail) || validationFactory.validateEmail(vm.email.newEmail) || validationFactory.validateEmail(vm.email.newEmailCheck)
				){
				if (vm.email.newEmail === vm.email.newEmailCheck){
					databaseService.updateUserEmail(vm.user.uid, vm.email.oldEmail, vm.email.newEmail, vm.email.passWord).then(
						function(data){
							SweetAlert.swal({
								title: "Your Email has been changed to:" + data.email,
								type: "success"
							});
						},
						function(error){
							SweetAlert.swal({
								title: "Your email could not been changed",
								text: error,
								type : "error"
							});
						});
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

	/**
	 * @ngdoc method
	 * @name changeUserPassword
	 * @description Set user's password to a new value according to a temporal value from input. If values in field do not match the Alert is shown.
	 * @methodOf notesApp.controller:userSettingsController
	 */
	vm.changeUserPassword = function(){
		if (vm.settings.demo){
			SweetAlert.swal({
				title: "This feature is temporarly disabled",
				text: "Fork this on GitHub and you may use it as you wish. :)",
				type: "info"
			});
		} else {
			if (validationFactory.validateEmail(vm.pass.email) || validationFactory.validatePassword(vm.pass.newPassWord) || validationFactory.validatePassword(vm.pass.newPassWordCheck)
				){
				if (vm.pass.newPassWord === vm.pass.newPassWordCheck){
					databaseService.updateUserPassword(vm.user.uid, vm.pass.email, vm.pass.oldPassWord, vm.pass.newPassWord).then(
						function(data){
							SweetAlert.swal({
								title: "Your Password for email " + data.email + " has been changed",
								type: "success"
							});
						},
						function(error){
							SweetAlert.swal({
								title: "Your email could not been changed",
								text: error,
								type : "error"
							});
						}
					);
				} else {
					SweetAlert.swal({
						title: "new passwords do not match.",
						type: "error"});
				}
			} else {
				SweetAlert.swal({
					title: "Email or passwords are not in valid format.",
					type: "error"});
			}
		}
	};
}
