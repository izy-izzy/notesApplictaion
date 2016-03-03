/**
 *  Service for firebase database connection. 
 *  This service needs to be initialised via setFirebaseHttp and getFirebase methods.
 *  @author lukaskalcok@gmail.com
 */
angular
    .module('notesApp')
    .service('databaseService', databaseService);

 function databaseService($firebaseArray, $firebaseObject) {
        
    var service = {
        firebaseHttp : null,
        firebaseObj : null,
        notes: {},
        comments: {},
        note: {},
        users: {},
        user: null,

        setFirebaseHttp: setLocation,

        getFirebase:getFirebase,
        getNotes:getNotes,
        getUsers:getUsers,
        getNote:getNote,
        getNoteComments:getNoteComments,

        setNoteComment:setNoteComment,
        setNote:setNote,

        removeNote:removeNote,
        removeNoteComment:removeNoteComment,

        authWithPassword:authWithPassword,
        unAuth:unAuth,

        destroyFirebaseObjects: destroyFirebaseObjects,

        getUserFirstName: getUserFirstName,
        getUserSurName: getUserSurName,
        getUserFullName: getUserFullName,
        getUser: getUser
    };
    return service;

    function setLocation(location) { 
        service.firebaseHttp = location;
    }

    /**
     *  Connect to firebase database.
     *  @return {object} Firebase object.
     */
    function getFirebase() {
        if (service.firebaseHttp){
            service.firebaseObj = new Firebase(service.firebaseHttp);
            service.getNotes();
            service.getUsers();
        }  
        return service.firebaseObj;
    }

    /**
     *  @return {object} $firebaseArray of all notes
     */
    function getNotes() {
        if (service.firebaseObj){
            service.notes = $firebaseArray(service.firebaseObj.child("notes"));
        } 
        return service.notes;
    }

    /**
     *  @return {object} $firebaseObject of all users
     */
    function getUsers() {
        if (service.firebaseObj){
            service.users = $firebaseObject(service.firebaseObj.child("users"));
        } 
        return service.users;
    }

    /**
     *  Searches for a specific note and returns a note as object
     *  @param {string} note id
     *  @return {object} note as $firebaseObject
     */
    function getNote(noteId) {
        if (noteId && service.firebaseObj) {
            service.note = $firebaseObject(service.firebaseObj.child("notes").child(noteId));
        } 
        return service.note;
    }

    /**
     *  Searches for a specific note and returns its comments
     *  @param {string} note id
     *  @return {object} note's comments as $firebaseArray
     */
    function getNoteComments(noteId) {
        if (noteId && service.firebaseObj) {
            service.comments = $firebaseArray(service.firebaseObj.child("notes").child(noteId).child("comments"));
        } 
        return service.comments;
    }

    /**
     *  Adds a new comment to a specific note
     *  @param {object} comment 
     *  @param {string} note id
     *  @param {string} comment id
     *  @return {object} result of comment insertion
     */
    function setNoteComment(newComment, noteId, commentId) {
        if (noteId && commentId && service.firebaseObj) {
            var fbReg = service.firebaseObj.child("notes").child(noteId).child("comments").child(commentId);
            return fbReg.set(newComment);
        } else {
            return null;
        }
    }

    /**
     *  Adds a new note
     *  @param {object} note  
     *  @param {string} note id
     *  @return {object} result of note insertion
     */
    function setNote(newNote, noteId) {
        if (noteId && service.firebaseObj) {
            var fbReg = service.firebaseObj.child("notes").child(noteId);
            return fbReg.set(newNote);
        } else {
            return null;
        }
    }

    /**
     *  Removes a note
     *  @param {string} note id
     *  @return {object} result of note deletion
     */
    function removeNote(noteId) {
        if (noteId && service.firebaseObj) {
            var fbReg = service.firebaseObj.child("notes").child(noteId);
            return fbReg.remove();
        } else {
            return null;
        }
    }

    /**
     *  Removes note's comment
     *  @param {string} note id
     *  @param {string} comment id
     *  @return {object} result of comment deletion
     */
    function removeNoteComment(noteId, commentId) {
        if (noteId && commentId && service.firebaseObj) {
            var fbReg = service.firebaseObj.child("notes").child(noteId).child("comments").child(commentId);
            return fbReg.remove();
        } else {
            return null;
        }
    }

    /**
     *  Authenticate user to database
     *  @param {oject} {email:string, password:string} user's credentials
     *  @return {object} promise containing information about authentication result
     */
    function authWithPassword(user) {
        if (service.firebaseObj){
            var deferred = $.Deferred();
            service.firebaseObj.authWithPassword(user, function onAuth(err, user) {
                if (err) {
                    deferred.reject(err);
                }
                if (user) {
                    deferred.resolve(user);
                }
            });
            return deferred.promise();
        } else {
            return null;
        }
    }

    /**
     *  Unauthenticate user from database
     *  @return {object} promise containing information about unauthentication result
     */
    function unAuth() {
        var deferred = $.Deferred();
        if (service.firebaseObj){
            service.firebaseObj.unauth(function onAuth(value) {
                if (value == null) {
                    service.destroyFirebaseObjects();
                    deferred.resolve(true);
                } else {
                    deferred.reject(false);
                }
            });
            return deferred.promise();
        } else {
            return null;
        }
    }

    /**
     *  Destroys all firebase objects
     */
    function destroyFirebaseObjects() {
        var arr = [service.notes, service.users, service.note, service.comments];
        angular.forEach(arr, function(value, key) {
            if (value != null) { 
                value('name', value).$destroy(); 
            }
        });
    };

    function getUserFirstName(userId){
        if (service.firebaseObj){
            var authorName = "";
            if (userId && service.users && service.users[userId]) {
                authorName = service.users[userId].firstname;
            } 
            return authorName;
        } else {
            return null;
        }
    }

    function getUserSurName(userId){
        if (service.firebaseObj){
            var authorName = "";
            if (userId && service.users && service.users[userId]) {
                authorName = service.users[userId].surname;
            } 
            return authorName;
        } else {
            return null;
        }
    }

    function getUserFullName(userId){
        return service.getUserFirstName(userId) + " " + service.getUserSurName(userId);
    }

    function getUser(userId){
        var imageFileName = "";
        if (service.firebaseObj){
            if (service.users && service.users[userId]){
                return service.users[userId];
            } 
        } else {
            return null;
        }
    }

}

