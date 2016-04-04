/**
 * @ngdoc service
 * @name notesApp.service:fileSystemFactory
 * @description Provides a routing for filesystem.
 * @function
 */
angular
	.module('notesApp')
	.factory('fileSystemFactory', fileSystemFactory);

function fileSystemFactory() {
	var factory = {
		settings: undefined,
		getUserPhoto: getUserPhoto,
		setSettings: setSettings
	};

	return factory;

	/**
	 * @ngdoc method
	 * @name setSettings
	 * @methodOf notesApp.service:fileSystemFactory
	 * @description Set the settings for filesystem
	 * @param {object} settings {@link notesApp.service:settingsService}
	 */
	function setSettings(settings){
		factory.settings = settings;
	};

	/**
	 * @ngdoc method
	 * @name getUserPhoto
	 * @methodOf notesApp.service:fileSystemFactory
	 * @param {string} userPhotoFile Image file name
	 * @returns {string} Path to file. If the userPhotoFile is empty the default user picture is returned
	 */
	function getUserPhoto(userPhotoFile) {
		if (!userPhotoFile && factory.settings && factory.settings.defaultUserPicture){
			userPhotoFile = factory.settings.defaultUserPicture;
		}
		if (factory.settings && factory.settings.pathToUserPictures){
			return factory.settings.pathToUserPictures + userPhotoFile;
		} else {
			return userPhotoFile;
		}
	};
}
