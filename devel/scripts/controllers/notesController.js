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
 * @requires notesApp.service:permissionFactory
 */
angular
	.module('notesApp')
	.controller("notesController", notesController);

notesController.$inject = ['$scope', '$state', 'databaseService', 'uidFactory', 'SweetAlert', 'authService', 'permissionFactory'];

/**
 * @ngdoc property
 * @name .#notes
 * @propertyOf notesApp.controller:notesController
 * @returns {object} {@link notesApp.service:databaseService#notes}
 */

/**
 * @ngdoc property
 * @name .#user
 * @propertyOf notesApp.controller:noteController
 * @returns {object} {@link notesApp.service:databaseService#user}
 */

function notesController($scope, $state,databaseService, uidFactory, SweetAlert, authService, permissionFactory) {

	var vm = this;

	vm.notes = databaseService.getNotes();
	vm.user = authService.getUser();

	/**
	 * @ngdoc method
	 * @name getUserFullName
	 * @methodOf notesApp.controller:notesController
	 * @param {string} note id
	 * @returns {string} Full name of note author
	 */
	vm.getUserFullName = function(note){
		return databaseService.getUserFullName(note.userId);
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

	/**
	 * @ngdoc method
	 * @name getUserNotePermissions
	 * @methodOf notesApp.controller:notesController
	 * @description Returns users permissions for note
	 * @param {object} note Note
	 * @return {object} user permissions
	 */
	vm.getUserNotePermissions = function(note){
		return permissionFactory.getNotePermissions(note, databaseService.getUser(vm.user.uid));
	};
}
