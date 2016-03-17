/**
 *  @author lukaskalcok@gmail.com
 */
angular.module('notesApp', [
    'firebase',
    'ui.router',
    'ngAnimate',
    'ngAria',
    'oitozero.ngSweetAlert',
    'ngResource'
]);

angular
    .module('notesApp')
    .config(appConfig);

appConfig.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider'];

function appConfig($stateProvider, $urlRouterProvider, $locationProvider) {

    $urlRouterProvider.otherwise("/intro");
    $locationProvider.html5Mode(true);

    $stateProvider
        .state('intro', {
            url: "/",
            templateUrl: "./templates/intro.html",
            controller: 'introController',
            controllerAs: 'vm'
        })
        .state('notes', {
            url: "/notes",
            templateUrl: "./templates/notes.html",
            controller: 'notesController',
            controllerAs: 'vm'
        })
        .state('userSettings', {
            url: "/usersettings",
            templateUrl: "./templates/usersettings.html",
            controller: 'userSettingsController',
            controllerAs: 'vm'
        })
        .state('note', {
            url: "/note/:noteID",
            templateUrl: "./templates/note.html",
            controller: 'noteController',
            controllerAs: 'vm'
        })
        .state('addnote', {
            url: "/addnote",
            templateUrl: "./templates/addnote.html",
            controller: 'addNoteController',
            controllerAs: 'vm'
        });
}
