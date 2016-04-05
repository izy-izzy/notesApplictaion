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
	// permission if the current node is not owner
	var usersPermissionsFalse = [
		{create : true,		read : true,	update : true,	delete : true	},	// level 0
		{create : false,	read : true,	update : false,	delete : false	},	// level 1
		{create : false,	read : true,	update : false,	delete : false	},	// level 2
		{create : false,	read : false,	update : false, delete : false	}	// level 3
	];
	// permission if the current node is owner
	var usersPermissionsTrue = [
		{create : true,		read : true,	update : true,	delete : true	},	// level 0
		{create : true,		read : true,	update : true,	delete : true	},	// level 1
		{create : false,	read : true,	update : false,	delete : false	},	// level 2
		{create : false, 	read : false,	update : false, delete : false	}	// level 3
	];

	var undefinedUserRightsLevel = 3;

	var factory = {
		getCommentPermissions: getCommentPermissions,
		getNotePermissions: getNotePermissions,
		createPermissions : createPermissions
	};
	return factory;

	/**
	 * @ngdoc method
	 * @name createPermissions
	 * @methodOf notesApp.service:permissionFactory
	 * @param {number} rightslevel User's rights level
	 * @param {boolean} hasRight User has rights for object
	 * @returns {object} Permissions for user
	 */
	function createPermissions(rightslevel, hasRight){
		if (!rightslevel){
			rightslevel = undefinedUserRightsLevel;
		}
		return hasRight ? usersPermissionsTrue[rightslevel] : usersPermissionsFalse[rightslevel];
	}

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
		var permissionsNote = getNotePermissions(note, user);
		var permissions = {};
		var userRights = user ? user.rightslevel : undefinedUserRightsLevel;
		var permissionsAdd = factory.createPermissions(userRights, comment && user && (comment.userId === user.userId));
		permissions.create = permissionsNote.create || permissionsAdd.create;
		permissions.read = permissionsNote.read || permissionsAdd.read;
		permissions.update = permissionsNote.update || permissionsAdd.update;
		permissions.delete = permissionsNote.delete || permissionsAdd.delete;
		return permissions;
	};



	/**
	 * @ngdoc method
	 * @name getNotePermissions
	 * @methodOf notesApp.service:permissionFactory
	 * @param {object} note {@link notesApp.service:databaseService#note}
	 * @param {object} user {@link notesApp.service:databaseService#user}
	 * @returns {object} permissions for note and user
	 */
	function getNotePermissions(note, user){
		var userRights = user ? user.rightslevel : undefinedUserRightsLevel;
		return factory.createPermissions(userRights, note && user && note.userId === user.userId);
	};
}
