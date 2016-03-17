/**
 *  Controller for adding notes
 *  @author lukaskalcok@gmail.com
 */
angular
    .module('notesApp')
    .controller("addNoteController", addNoteController);

addNoteController.$inject = ['$scope','databaseService','$state','uidFactory','SweetAlert', 'authService'];

function addNoteController($scope, databaseService, $state, uidFactory, SweetAlert, authService) {

    var vm = this;

    vm.newnote = {
        title: "",
        comments: {}
    };

    vm.newcomment = "";

    /**
    *  Adds a new note. Checks whether text and title is not empty and inserts a note. 
    *  If text or title is empty user, is warned and action is canceled.
    *  New note is added with current time, title, active user id and comment (which includes text, current time and active user's id) to this note.
    */
    vm.addNewNote = function() {
        if (vm.newnote.title !== "" && vm.newcomment !== "") {
            vm.newnote.comments["" + uidFactory.getUID() + ""] = {
                text: vm.newcomment,
                created: Date.now(),
                userID: authService.getUser().uid
            };
            vm.newnote.created = Date.now();
            vm.newnote.userID = authService.getUser().uid;
            databaseService.setNote(vm.newnote, uidFactory.getUID()).then(function() {
                SweetAlert.swal({
                    title: "Your note has been saved.",
                    type: "success"
                });
                $state.go('notes');
            });
        } else {
            SweetAlert.swal({
                title: "You have to fill in title and text.",
                type: "warning"
            });
        }
    };
}
