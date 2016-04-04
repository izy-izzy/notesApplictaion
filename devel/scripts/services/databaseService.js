 /**
 * @ngdoc service
 * @name notesApp.service:databaseService
 * @function
 *
 * @description Service for firebase database connection. Holds all database accessible object except user. This service needs to be initialised via setFirebaseHttp and getFirebase methods.
 *
 * @requires angularfire
 */
angular
	.module('notesApp')
	.service('databaseService', databaseService);

databaseService.$inject = ['$firebaseArray', '$firebaseObject'];

/**
 * @ngdoc property
 * @name .#notes
 * @propertyOf notesApp.service:databaseService
 * @returns {$firebaseObject}
 *
 * Never access directly. Use <code>getNotes()</code> method instead.
 *
 * <pre>
 * note: {
 *  comments : [
 *   XXXXXXXX-XXXXXXXX-XXXXXXXX : {
 *    created: int (ms),
 *    text: string,
 *    userID: string
 *   }
 *   created: int (ms),
 *   title: string,
 *   userID: string
 * }
 * </pre>
 */

 /**
 * @ngdoc property
 * @name .#users
 * @propertyOf notesApp.service:databaseService
 * @returns {$firebaseObject}
 *
 * Never access directly. Use <code>getUsers()</code> or <code>getUser()</code> method instead.
 *
 * <pre>
 * user: {
 *  firstname: string,
	 *  imagefile: string,
 *  rightslevel: int,
 *  surname: string
 * }
 * </pre>
 */



function databaseService($firebaseArray, $firebaseObject) {

	var service = {
		firebaseHttp : undefined,
		firebaseObj : undefined,
		notes: undefined,
		comments: undefined,
		note: undefined,
		users: undefined,

		getNotes:getNotes,
		getUsers:getUsers,
		getNote:getNote,
		getNoteComments:getNoteComments,

		setNoteComment:setNoteComment,
		setNote:setNote,
		setFirebase : setFirebase,

		removeNote:removeNote,
		removeNoteComment:removeNoteComment,

		destroyFirebaseObjects: destroyFirebaseObjects,

		getUserFirstName: getUserFirstName,
		getUserSurName: getUserSurName,
		getUserFullName: getUserFullName,
		getUser: getUser
	};
	return service;

	/**
	 * @ngdoc method
	 * @name setFirebase
	 * @methodOf notesApp.service:databaseService
	 * @description Sets firebase object and loads all notes and users.
	 * @param {object} loadedFirebase Already connected firebase object.
	 */
	function setFirebase(loadedFirebase){
		service.firebaseObj = loadedFirebase;
		service.getNotes();
		service.getUsers();
	}

	/**
	 * @ngdoc method
	 * @name getNotes
	 * @methodOf notesApp.service:databaseService
	 * @description Load notes from database
	 * @returns {object} notes as $firebaseObject
	 */
	function getNotes() {
		if (service.firebaseObj && !service.notes){
			service.notes = $firebaseArray(service.firebaseObj.child("notes"));
		}
		return service.notes;
	}

	/**
	 * @ngdoc method
	 * @name getUsers
	 * @methodOf notesApp.service:databaseService
	 * @description Load users from database
	 * @returns {object} users as $firebaseObject
	 */
	function getUsers() {
		if (service.firebaseObj && !service.users){
			service.users = $firebaseObject(service.firebaseObj.child("users"));
		}
		return service.users;
	}

	/**
	 * @ngdoc method
	 * @name getNote
	 * @methodOf notesApp.service:databaseService
	 * @description Load note from database
	 * @param {string} noteId Id of note to be returned
	 * @returns {object} note as $firebaseObject
	 */
	function getNote(noteId) {
		if (noteId && service.firebaseObj) {
			service.note = $firebaseObject(service.firebaseObj.child("notes").child(noteId));
		}
		return service.note;
	}

	/**
	 * @ngdoc method
	 * @name getNoteComments
	 * @methodOf notesApp.service:databaseService
	 * @description Searches for a specific note and returns its comments
	 * @param {string} noteId Id of note to be returned
	 * @param {string} noteId Id of note which comments should be loaded
	 * @returns {object} Note's comments as $firebaseArray.
	 */
	function getNoteComments(noteId) {
		if (noteId && service.firebaseObj) {
			service.comments = $firebaseArray(service.firebaseObj.child("notes").child(noteId).child("comments"));
		}
		return service.comments;
	}

	/**
	 * @ngdoc method
	 * @name getNoteComments
	 * @methodOf notesApp.service:databaseService
	 * @description Adds a new comment to a specific note.
	 * @param {object} newComment New comment that should be added
	 * @param {string} noteId note id
	 * @param {string} commentId comment id
	 * @returns {object} result of comment insertion
	 */
	function setNoteComment(newComment, noteId, commentId) {
		if (noteId && commentId && service.firebaseObj) {
			var fbReg = service.firebaseObj.child("notes").child(noteId).child("comments").child(commentId);
			return fbReg.set(newComment);
		} else {
			return undefined;
		}
	}

	/**
	 * @ngdoc method
	 * @name setNote
	 * @methodOf notesApp.service:databaseService
	 * @description Adds a new note.
	 * @param {object} newNote Note to be added
	 * @param {string} noteId note id
	 * @returns {object} result of note insertion
	 */
	function setNote(newNote, noteId) {
		if (noteId && service.firebaseObj) {
			var fbReg = service.firebaseObj.child("notes").child(noteId);
			return fbReg.set(newNote);
		} else {
			return undefined;
		}
	}

	/**
	 * @ngdoc method
	 * @name removeNote
	 * @methodOf notesApp.service:databaseService
	 * @description Removes a note.
	 * @param {string} noteId note id
	 * @returns {object} result of note insertion
	 */
	function removeNote(noteId) {
		if (noteId && service.firebaseObj) {
			var fbReg = service.firebaseObj.child("notes").child(noteId);
			return fbReg.remove();
		} else {
			return undefined;
		}
	}

	/**
	 * @ngdoc method
	 * @name removeNote
	 * @methodOf notesApp.service:databaseService
	 * @description Removes note's comment.
	 * @param {string} noteId note id
	 * @param {string} commentId comment id
	 * @returns {object} result of note deletion
	 */
	function removeNoteComment(noteId, commentId) {
		if (noteId && commentId && service.firebaseObj) {
			var fbReg = service.firebaseObj.child("notes").child(noteId).child("comments").child(commentId);
			return fbReg.remove();
		} else {
			return undefined;
		}
	}

	/**
	 * @ngdoc method
	 * @name destroyFirebaseObjects
	 * @methodOf notesApp.service:databaseService
	 * @description Destroys all firebase objects.
	 */
	function destroyFirebaseObjects() {
		var arr = [service.notes, service.users, service.note, service.comments];
		angular.forEach(arr, function(value) {
			if (value !== undefined) {
				value('name', value).$destroy();
			}
		});
	}

	/**
	 * @ngdoc method
	 * @name getUserFirstName
	 * @methodOf notesApp.service:databaseService
	 * @param {string} userId ID of user whose first name should be returned.
	 * @returns {string} firstname of user or clear <code>string</code>
	 */
	function getUserFirstName(userId){
		if (service.getUsers() && service.getUsers()[userId] && service.getUsers()[userId].firstname){
			return service.getUsers()[userId].firstname;
		} else {
			return "";
		}
	}

	/**
	 * @ngdoc method
	 * @name getUserSurName
	 * @methodOf notesApp.service:databaseService
	 * @param {string} userId ID of user whose surname should be returned.
	 * @returns {string} surname of user or clear <code>string</code>
	 */
	function getUserSurName(userId){
		if (service.getUsers() && service.getUsers()[userId] && service.getUsers()[userId].surname){
			return service.getUsers()[userId].surname;
		} else {
			return "";
		}
	}

	/**
	 * @ngdoc method
	 * @name getUserFullName
	 * @methodOf notesApp.service:databaseService
	 * @description uses <code>getUserFirstName</code> and <code>getUserSurName</code>
	 * @param {string} userId ID of user whose full name should be returned.
	 * @returns {string} fullname or partial name or clear <code>string</code>
	 */
	function getUserFullName(userId){
		return service.getUserFirstName(userId) + " " + service.getUserSurName(userId);
	}

	/**
	 * @ngdoc method
	 * @name getUser
	 * @methodOf notesApp.service:databaseService
	 * @param {string} userId ID of user which should be returned.
	 * @returns {object} user
	 */
	function getUser(userId){
		if (service.getUsers() && service.getUsers()[userId]){
			var user = service.getUsers()[userId];
			user.userId = userId;
			return user;
		} else {
			return undefined;
		}
	}

}
