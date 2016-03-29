 /**
 * @ngdoc service
 * @name notesApp.service:settingsService
 * @function
 *
 * @description Loads <code>settings.json</code>.
 *
 */
angular
	.module('notesApp')
	.service('settingsService', settingsService);

settingsService.$inject = ['$http', '$q'];

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

function settingsService($http, $q) {
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
			$http.get('settings.json').then(function(object){
					service.settings = object.data;
					service.settingsResource.resolve(service.settings);
				})
				.catch(function(){

				});
		}
		return service.settingsResource.promise;
	}

}