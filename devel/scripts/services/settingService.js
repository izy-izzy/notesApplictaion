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
        getSettings: getSettings
    }

    return service;

    function getSettings() {
        return $http.get('settings.json')
            .then(getSettingFileComplete)
            .catch(getSettingFileFailed);

        function getSettingFileComplete(response) {
            return response.data;
        }

        function getSettingFileFailed(error) {
            logger.error('XHR Failed for getAvengers.' + error.data);
        }
    }
}
