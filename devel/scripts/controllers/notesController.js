/**
 * @ngdoc controller
 * @name notesApp.controller:notesController
 *
 * @description Controlls header
 *
 * @requires SweetAlert
 * @requires notesApp.service:authService
 * @requires notesApp.service:databaseService
 * @requires notesApp.service:uidFactory
 */
angular
	.module('notesApp')
	.controller("notesController", notesController);

notesController.$inject = ['$scope', '$state', 'databaseService', 'uidFactory', 'SweetAlert'];

/**
 * @ngdoc property
 * @name .#notes
 * @propertyOf notesApp.controller:notesController
 * @returns {object} {@link notesApp.service:databaseService#notes}
 */

function notesController($scope, $state,databaseService,uidFactory, SweetAlert) {

	var vm = this;

	vm.notes = databaseService.getNotes();

	/**
	 * @ngdoc method
	 * @name getUserFullName
	 * @methodOf notesApp.controller:notesController
	 * @param {string} note id
	 * @returns {string} Full name of note author
	 */
	vm.getUserFullName = function(note){
		return databaseService.getUserFullName(note.userID);
	};

	/**
	 * @ngdoc method
	 * @name deleteNote
	 * @methodOf notesApp.controller:notesController
	 * @description Deletes a note. Prompts to confirm request and according to selected action it deletes the note or cancel the request.
	 * @param {string} id of note
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
