/**
 * @ngdoc controller
 * @name notesApp.controller:noteController
 *
 * @description Controlls header
 *
 * @requires SweetAlert
 * @requires notesApp.service:authService
 * @requires notesApp.service:databaseService
 * @requires notesApp.service:uidFactory
 * @requires notesApp.service:settingsService
 * @requires notesApp.service:fileSystemFactory
 */
angular
	.module('notesApp')
	.controller("noteController", noteController);

noteController.$inject = ['$state','$scope','$stateParams','databaseService','uidFactory','SweetAlert', 'settingsService', 'authService', 'fileSystemFactory'];

/**
 * @ngdoc property
 * @name .#settings
 * @propertyOf notesApp.controller:noteController
 * @returns {object} {@link notesApp.service:settingsService#settings}
 */

/**
 * @ngdoc property
 * @name .#comments
 * @propertyOf notesApp.controller:noteController
 * @returns {object} {@link notesApp.service:databaseService#comments} Comments of this note.
 */

/**
 * @ngdoc property
 * @name .#note
 * @propertyOf notesApp.controller:noteController
 * @returns {object} {@link notesApp.service:databaseService#note} this note.
 */

/**
 * @ngdoc property
 * @name .#noteId
 * @propertyOf notesApp.controller:noteController
 * @returns {string} Id of this note.
 */

function noteController($state, $scope, $stateParams, databaseService, uidFactory, SweetAlert, settingsService, authService, fileSystemFactory) {

	var vm = this;

	vm.commentsAddingMode = false;
	vm.newcomment = {
		text: ""
	};

	vm.noteId = $stateParams.noteID;

	vm.comments = databaseService.getNoteComments(vm.noteId);
	vm.note = databaseService.getNote(vm.noteId);

	vm.settings = undefined;
	settingsService.getSettings().then(function(data){
		vm.settings = data;
	});

	/**
	 * @ngdoc method
	 * @name initwatch
	 * @methodOf notesApp.controller:noteController
	 * @description Watches for changes in a note. If a change is detected <code>checkNoteStatus()</code> is called.
	 */
	vm.initwatch = function(){
		if (vm.note){
			vm.note.$watch(function() {
				vm.checkNoteStatus();
			});
		}
	};
	vm.initwatch();

	/**
	 * @ngdoc method
	 * @name checkNoteStatus
	 * @methodOf notesApp.controller:noteController
	 * @description Checks if the current note is empty. If the note is empty/deleted, warning is shown and user is rerouted to notes overview.
	 */
	vm.checkNoteStatus = function(){
		if (vm.note && vm.note.title && vm.note.created && vm.note.userID){
		} else {
			SweetAlert.swal({
				title: "This note has been deleted.",
				type: "warning"});
			$state.go('notes');
		}
	};

	/**
	 * @ngdoc method
	 * @name deleteComment
	 * @methodOf notesApp.controller:noteController
	 * @description Deletes a comment. Prompts to confirm request and according to selected action it deletes the comment or cancel the request.
	 * @param {string} id of comment
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
				databaseService.removeNoteComment(vm.note.$id, comment.$id).then(function(){
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
	 * @name addNewComment
	 * @methodOf notesApp.controller:noteController
	 * @description Adds a new comment. Checks whether text is not empty and inserts the comment to the active note. If text is empty, user is warned and action is canceled. New comment is added with text, current time and userID of the active user.
	 */
	vm.addNewComment = function(){
		if (vm.newcomment.text !== ""){
			if (!vm.note.comments){
				vm.note.comments = {};
			}
			vm.note.comments[""+uidFactory.getUID()+""] = {
				text: vm.newcomment,
				created: Date.now(),
				userID: authService.getUser().uid
			};
			vm.newcomment.created = Date.now();
			vm.newcomment.userID = authService.getUser().uid;
			databaseService.setNoteComment(vm.newcomment, vm.note.$id, uidFactory.getUID());
		} else {
			SweetAlert.swal({
				title: "Your note can not be empty.",
				type: "warning"});
		}
		vm.newcomment = {
			text: ""
		};
	};

	/**
	 * @ngdoc method
	 * @name getUserFirstName
	 * @methodOf notesApp.controller:noteController
	 * @description Returns a name of an author who created a comment
	 * @param {string} comment id
	 * @return {string} name of author
	 */
	vm.getUserFirstName = function(comment){
		if (comment) {
			return databaseService.getUserFirstName(comment.userID);
		} else {
			return undefined;
		}
	};

	/**
	 * @ngdoc method
	 * @name getUserPhoto
	 * @methodOf notesApp.controller:noteController
	 * @description Returns imagePath of an author who created a comment
	 * @param {string} comment id
	 * @return {string} relative path to author's photo
	 */
	vm.getUserPhoto = function(comment){
		var imageFileName;
 		if (comment && databaseService.getUser(comment.userID) && databaseService.getUser(comment.userID).imagefile !== ""){
 			imageFileName = databaseService.getUser(comment.userID).imagefile;
 		}
 		return fileSystemFactory.getUserPhoto(imageFileName);
	};

	/**
	 * @ngdoc method
	 * @name getUserFullName
	 * @methodOf notesApp.controller:noteController
	 * @description Returns full name of notes author
	 * @param {string} note id
	 * @return {string} Full name of note author
	 */
	vm.getUserFullName = function(note){
		return databaseService.getUserFullName(note.userID);
	};

}
