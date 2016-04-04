/**
 * @ngdoc service
 * @name notesApp.service:permissionFactory
 * @description Deals with permissions for user
 *
 * Permissions object:
 *<pre>
 * {
 *  read : true/false,
 *  update : true/false,
 *  create : true/false,
 *  delete : true/false
 * }
 *</pre>
 *
 * user's rights level:
 *<pre>
 * 2 : visitor : May only view comments and notes.
 * 1 : default user. May create new notes and comments. May delete and update own notes and comments.
 * 0 : admin user. May create, delete and update any comments.
 *</pre>
 * @function
 */

angular
	.module('notesApp')
	.factory('permissionFactory', permissionFactory);

function permissionFactory() {

	var usersPermissionsDefault = [
		{create : true,		read : true,	update : true,	delete : true	},	// level 0
		{create : true, 	read : true,	update : false,	delete : false	},	// level 1
		{create : false,	read : true,	update : false,	delete : false	}	// level 2
	];

	var usersPermissionsFalse = [
		{create : true,		read : true,	update : true,	delete : true	},	// level 0
		{create : false,	read : false,	update : false,	delete : false	},	// level 1
		{create : false,	read : false,	update : false,	delete : false	}	// level 2
	];

	var usersPermissionsTrue = [
		{ create : true,	read : true,	update : true,	delete : true	},	// level 0
		{ create : true,	read : true,	update : true,	delete : true	},	// level 1
		{ create : false,	read : true,	update : false,	delete : false	}	// level 2
	];

	var service = {
		getCommentPermissions: getCommentPermissions,
		getNotePermissions: getNotePermissions
	};
	return service;

	/**
	 * @ngdoc method
	 * @name getCommentPermissions
	 * @methodOf notesApp.service:permissionFactory
	 * @param {object} note {@link notesApp.service:databaseService#note}
	 * @param {object} comment {@link notesApp.service:databaseService#comment}
	 * @param {object} user {@link notesApp.service:databaseService#user}
	 * @returns {object} permissions for comment of the note for user
	 */
	function getCommentPermissions(note, comment, user) {
		var permissions = getNotePermissions(note, user);
		if (comment && user) {
			if (comment.userId === user.userId){
				permissions = createTruePermissions(user.rightslevel);
			}
		}
		return permissions;
	};

	/**
	 * @ngdoc method
	 * @name createClearPermission
	 * @methodOf notesApp.service:permissionFactory
	 * @param {number} rightslevel User's rights level
	 * @returns {object}
	 * Default permissions are:
	 * <pre>
	 * {
	 *  read : true,
	 *  update : false,
	 *  create : true,
	 *  delete : false
	 * }
	 * </pre>
	 */
	function createClearPermission(rightslevel){
		var permissions = usersPermissionsDefault[rightslevel];
		return permissions;
	};

	/**
	 * @ngdoc method
	 * @name createClearPermission
	 * @methodOf notesApp.service:permissionFactory
	 * @param {number} rightslevel User's rights level
	 * @returns {object} Permissions are all set to false
	 */
	function createFalsePermissions(rightslevel){
		var permissions = usersPermissionsFalse[rightslevel];
		return permissions;
	}

	/**
	 * @ngdoc method
	 * @name createTruePermissions
	 * @methodOf notesApp.service:permissionFactory
	 * @param {number} rightslevel User's rights level
	 * @returns {object} Permissions are all set to false
	 */
	function createTruePermissions(rightslevel){
		var permissions = usersPermissionsTrue[rightslevel];
		return permissions;
	}

	/**
	 * @ngdoc method
	 * @name getNotePermissions
	 * @methodOf notesApp.service:permissionFactory
	 * @param {object} note {@link notesApp.service:databaseService#note}
	 * @param {object} user {@link notesApp.service:databaseService#user}
	 * @returns {object} permissions for note and user
	 */
	function getNotePermissions(note, user){
		console.log(user, note);
		var permissions = createClearPermission(user.rightslevel);
		if (note && user){
			if (note.userId === user.userId){
				permissions.create = false;
				permissions.read = true;
				permissions.update = false;
				permissions.delete = true;
			}
		} else {
			permissions = createFalsePermissions(user.rightslevel);
		}
		return permissions;
	};
}
