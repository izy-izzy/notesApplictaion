 /**
 * @ngdoc service
 * @name notesApp.service:settingsService
 * @function
 *
 * @description Loads <code>settings.json</code> (on any domain) or <code>settings_localhost.json</code> (on localhost).
 *
 */
angular
	.module('notesApp')
	.service('settingsService', settingsService);

settingsService.$inject = ['$http', '$q', '$location'];

/**
 * @ngdoc property
 * @name .#settings
 * @propertyOf notesApp.service:settingsService
 * @returns {object}
 * <pre>
 * settings: {
 *  fireBaseHttp: string,
 *  pathToUserPictures: string,
 *  defaultUserPicture: string
 * }
 * </pre>
 */

function settingsService($http, $q, $location) {
	var service = {
		getSettings: getSettings,
		settings : {
			fireBaseHttp: "",
			pathToUserPictures: "",
			defaultUserPicture: ""
		},
		settingsResource : undefined
	};

	return service;

	/**
	 * @ngdoc method
	 * @name getSettings
	 * @methodOf notesApp.service:settingsService
	 * @description loads data from file 'settings.json'
	 * @returns {promise} promise containing data from a file or error information
	 */
	function getSettings(){
		if (service.settingsResource === undefined){
			service.settingsResource = $q.defer();
			var host = $location.host();
			var filename = "settings" + "_" + host + ".json";
			$http.get(filename).then(function(object){
					service.settings = object.data;
					service.settingsResource.resolve(service.settings);
				})
				.catch(function(){

				});
		}
		return service.settingsResource.promise;
	}

}
