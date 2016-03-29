/**
 *  Controller of notes 
 *  author lukaskalcok@gmail.com
 */
angular
	.module('notesApp')
	.controller("notesController", notesController);

notesController.$inject = ['$scope', '$state', 'databaseService', 'uidFactory', 'SweetAlert'];

function notesController($scope, $state,databaseService,uidFactory, SweetAlert) {

	var vm = this;

	vm.notes = databaseService.getNotes();

	/**
	*  param {string} note id
	*  return {string} Full name of note author
	*/
	vm.getUserFullName = function(note){
		return databaseService.getUserFullName(note.userID);
	};

	/**
	*  Deletes a note. Prompts to confirm request and according to selected action it deletes the note or cancel the request.
	*  param {string} id of note 
	*/
	vm.deleteNote = function(note){
		SweetAlert.swal({
			title: "Do you really want to delete this note?",
			text: "Deleting this note will also remove all its notes.",
			showCancelButton: true,
			closeOnConfirm: false,
			closeOnCancel: true,
			confirmButtonColor: "#f13c78",
			confirmButtonText: "Yes, delete it",
			cancelButtonText: "Cancel"
		}, function(isConfirm){
			if (isConfirm){
				databaseService.removeNote(note.$id).then(function(){
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
	};
}

