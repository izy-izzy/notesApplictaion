/**
 * @ngdoc directive
 * @scope 
 * @name notesApp.ngUserline
 * @restrict AE
 * @function
 *
 * @description
 * Render area with user avatar and information
 *
 * <pre>
 * <ng-userline user-photo="avatar.png" user-name="Mike Stevensons" logout-function="function()">
 * </ng-userline>
 * </pre>
 */

angular.module('notesApp').directive('ngUserline', ngUserline);

ngUserline.$inject = [];

function ngUserline() {
	var directive = {
		restrict: 'AE',
		templateUrl: 'templates/directives/userinfodirective.html',
		scope: {
			userPhoto: '=',
			userName: '=',
			logoutFunction: '&'
		},
		controller: userLineController,
		controllerAs: 'vm',
		bindToController: true 
	};

	return directive;
}

userLineController.$inject = ["$scope","$state"];

function userLineController($scope, $state){
	var vm = this;

	/**
	 * @ngdoc method
	 * @name vm.gotoSettings
	 * @methodOf notesApp.ngUserline
	 * @description swich state to 'userSettings'
	 */
	vm.gotoSettings = function(){
		$state.go('userSettings');
	};
}
