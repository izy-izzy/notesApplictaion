angular.module('notesApp').directive('ngUserline', ngUserline);

ngUserline.$inject = ['authService', '$compile'];

function ngUserline(authService, $compile) {
    return {
        restrict: 'AE',
        templateUrl: 'templates/directives/userinfodirective.html',
        controller: ['$scope', function($scope) {
      		 
    	}],
        scope: {
            userName: '=',
            logoutFunction: '&'
        }

    }
};
