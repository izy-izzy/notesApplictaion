angular.module('notesApp').directive('ngUserline', ngUserline);

ngUserline.$inject = ['$compile'];

function ngUserline($compile) {
    var directive = {
        restrict: 'AE',
        templateUrl: 'templates/directives/userinfodirective.html',
        scope: {
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

    vm.gotoSettings = function(){
        $state.go('userSettings');
    };
}
