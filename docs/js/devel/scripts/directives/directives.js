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
 * @example
 	<doc:example module="notesApp">
 		<doc:source>
 			<ng-userline user-photo="avatar.png" user-name="Mike Stevensons" logout-function="function()">
 			</ng-userline>
 		</doc:source>
 	</doc:example>
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

	console.log("inset");

	vm.gotoSettings = function(){
		$state.go('userSettings');
	};
}
