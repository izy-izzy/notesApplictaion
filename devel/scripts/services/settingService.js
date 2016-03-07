/**
 *  Loads 'settings.json'  
 *  @return {object} promise containing data from a file or error information
 */
angular
    .module('notesApp')
    .service('settingsService', settingsService);

settingsService.$inject = ['$http', '$resource'];

function settingsService($http, $resource) {
    var service = {
        data: {},
        getSettings: getSettings,
        settings : null
    }

    return service;

    function getSettings(){
        service.settings = $resource('settings.json', {}, {
            query: {
                method:'GET', 
                params:{}, 
                isArray:false
            }
        });
        return service.settings;
    };
}