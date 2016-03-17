/**
 *  Loads 'settings.json'  
 *  @return {object} promise containing data from a file or error information
 */
angular
    .module('notesApp')
    .service('settingsService', settingsService);

settingsService.$inject = ['$http', '$resource', '$q'];

function settingsService($http, $resource, $q) {
    var service = {
        data: {},
        getSettings: getSettings,
        settings : {
            fireBaseHttp: "",
            pathToUserPictures: "",
            defaultUserPicture: ""
        },
        settingsResource : undefined
    };

    return service;
    
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