/**
 *  Controller of a note 
 *  @author lukaskalcok@gmail.com
 */
angular
    .module('notesApp')
    .controller("noteController", noteController);

noteController.$inject = ['$state','$scope','$stateParams','databaseService','uidFactory','SweetAlert'];

function noteController($state, $scope, $stateParams, databaseService, uidFactory, SweetAlert) {
    
    var vm = this;

    vm.commentsAddingMode = false;
    vm.newcomment = {
        text: ""
    };

    vm.noteId = $stateParams.noteID;

    vm.comments = databaseService.getNoteComments(vm.noteId);
    vm.note = databaseService.getNote(vm.noteId);

    /**
     *  Watches for changes in a note. If a change is detected checkNoteStatus() is called.  
     */
    vm.initwatch = function(){
        if ($scope.note){
            var watchNode = $scope.note.$watch(function() {
                vm.checkNoteStatus();
            });
        }
    }
    vm.initwatch();

    /**
     *  Checks if the current note is empty. If the note is empty/deleted, warning is shown and user is rerouted to notes overview.
     */
    vm.checkNoteStatus = function(){
        if ($scope.note && $scope.note.title && $scope.note.created && $scope.note.userID){}
        else {
            SweetAlert.swal({
                title: "This note has been deleted.",
                type: "warning"});  
            $state.go('notes');
        }
    };

    /**
     *  Redirects to notes
     */
    vm.goToNotes = function(){
        $state.go('notes');
    }


    /**
     *  Deletes a comment. Prompts to confirm request and according to selected action it deletes the comment or cancel the request.
     *  @param {string} id of comment 
     */
    vm.deleteComment = function(comment){
        SweetAlert.swal({
            title: "Do you really want to delete this note?",
            showCancelButton: true,
            closeOnConfirm: false,
            closeOnCancel: true,
            confirmButtonColor: "#f13c78",
            confirmButtonText: "Yes, delete it",
            cancelButtonText: "Cancel"
        }, function(isConfirm){
            if (isConfirm){
                databaseService.removeNoteComment($scope.note.$id, comment.$id).then(function(){
                    SweetAlert.swal({
                        title: "Your note has been removed.",
                        type: "success"});
                },function(){
                    SweetAlert.swal({
                        title: "Unable to remove this note.",
                        type: "error"});
                });
            }
        });
    }

    /**
    *  Adds a new comment. Checks whether text is not empty and inserts the comment to the active note. If text is empty, user is warned and action is canceled. 
    *  New comment is added with text, current time and userID of the active user.
    */
    vm.addNewComment = function(){
        if (vm.newcomment.text != ""){
            if (!$scope.note.comments){
                $scope.note.comments = {};
            }
            $scope.note.comments[""+uidFactory.getUID()+""] = { 
                text: vm.newcomment, 
                created: Date.now(),
                userID: $scope.user.uid
            };
            vm.newcomment.created = Date.now();
            vm.newcomment.userID = $scope.user.uid;
            databaseService.setNoteComment(vm.newcomment, $scope.note.$id, uidFactory.getUID());
        } else {
            SweetAlert.swal({
                title: "Your note can not be empty.",
                type: "warning"});
        }
        vm.newcomment = {
            text: ""
        };
    }

    /**
    *  Returns a name of an author who created a comment
    *  @param {string} comment id
    *  @return {string} name of author 
    */
    vm.getUserFirstName = function(comment){
        if (comment) {
            return databaseService.getUserFirstName(comment.userID);
        } else {
            return null;
        }
    }

    /**
    *  Returns imagePath of an author who created a comment
    *  @param {string} comment id
    *  @return {string} relative path to author's photo
    */
    vm.getUserPhoto = function(comment){
        var imagePath = "";
        var imageFileName = "default.jpg";
        if ($scope.settings){
            imageFileName = $scope.settings.defaultUserPicture;
            imagePath = $scope.settings.pathToUserPictures;
        } 
        if (comment && $scope.settings && databaseService.getUser(comment.userID) && databaseService.getUser(comment.userID).imagefile != ""){
            imageFileName = databaseService.getUser(comment.userID).imagefile;
        } 
        return imagePath + imageFileName;
    }
   
}