/**
 *  Loads 'settings.json'  
 *  @return {object} promise containing data from a file or error information
 */
angular
    .module('notesApp')
    .service('settingsService', settingsService);

settingsService.$inject = ['$http'];

function settingsService($http) {
    var service = {
        data: {},
        getSettings: getSettings,
        settings : null
    }

    return service;

    function getSettings() {
        if (!service.settings){
            return $http.get('settings.json')
                .then(getSettingFileComplete)
                .catch(getSettingFileFailed);

            function getSettingFileComplete(response) {
                service.settings = response.data;
                return service.settings;
            }

            function getSettingFileFailed(error) {
                logger.error('XHR Failed for getAvengers.' + error.data);
            }
        } else {
            return service.settings;
        }
    }
}
