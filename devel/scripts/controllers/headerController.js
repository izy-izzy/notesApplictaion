/**
 *  Controller of header 
 *  @author lukaskalcok@gmail.com
 */
angular
	.module('notesApp')
	.controller("headerController", headerController);

headerController.$inject = ['$scope', '$state', 'authService', 'databaseService', 'settingsService' ];

function headerController($scope, $state, authService, databaseService, settingsService ) {

	var vm = this;
	
	vm.user = authService.getUser();

    vm.settings = undefined;
    settingsService.getSettings().then(function(data){
        vm.settings = data;
    });

    vm.logoutUser = function() {
        authService.unAuth();
    };
    
    vm.getUserName = function(){
        return databaseService.getUserFullName(vm.user.uid);
    };

    vm.getUserPhoto = function(){
        var imageFileName = "avatar_default.png";
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