/**
 *  Controller of userSettings 
 *  @author lukaskalcok@gmail.com
 */
angular
	.module('notesApp')
	.controller("userSettingsController", userSettingsController);

userSettingsController.$inject = ['$scope', '$state', 'databaseService', 'authService', 'settingsService'];

function userSettingsController($scope, $state, databaseService, authService, settingsService) {
	var vm = this;

	vm.user = authService.getUser();

	vm.settings = undefined;
	settingsService.getSettings().then(function(data){
		vm.settings = data;
	});
	
	/**
	 *  Logs out a $scope.user.
	 */
	vm.logoutUser = function() {
		authService.unAuth();
	};

	/**
	 *  @return {string} Full name of note author
	 */
	vm.getUserName = function(){
		if (vm.user.uid){
			return databaseService.getUserFullName(vm.user.uid);
		}
	};

	vm.getUserPhoto = function(){
		var imageFileName = "default.jpg";
		if (settingsService.getSettings() && databaseService.getUser(vm.user.uid) && databaseService.getUser(vm.user.uid).imagefile !== ""){
			imageFileName = databaseService.getUser(vm.user.uid).imagefile;
		} 
		if (vm.settings && vm.settings.pathToUserPictures){
			return vm.settings.pathToUserPictures + imageFileName;
		} else {
			return imageFileName;
		}
	};
}