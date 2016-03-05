angular.module('notesApp').directive('ngUserline', ngUserline);

ngUserline.$inject = ['authService', '$compile'];

function ngUserline(authService, $compile) {
    var directive = {
        restrict: 'AE',
        templateUrl: 'templates/directives/userinfodirective.html',
        scope: {
            userName: '=',
            logoutFunction: '&'
        },
        controller: userLineController,
        controllerAs: 'vm',
        bindToController: true // because the scope is isolated
    }

    return directive;
};

userLineController.$inject = ["$scope"];

function userLineController($scope){
    var vm = this;
}
