/**
 *  Loads 'settings.json'  
 *  @return {object} promise containing data from a file or error information
 */
angular
    .module('notesApp')
    .service('authService', authService);

authService.$inject = ['$firebaseArray', '$firebaseObject', '$firebaseAuth', '$q'];

function authService($firebaseArray, $firebaseObject, $firebaseAuth, $q) {
    var service = {
        firebaseHttp : null,
        firebaseObj : null,
        firebaseAuthObj : null,
        user: {
	        loginData: {
	            email: "",
	            password: ""
	        },
	        uid: "",
	        token: "",
	        loginFailed: false,
	        logoutFailed: false,
	        authenticated: false,
	        unAuthRequest: false
	    },
        setLocation : setLocation,
        getFirebase : getFirebase,
	    clearUser: clearUser,
	    getUser: getUser,
        authWithPassword:authWithPassword,
        unAuth:unAuth,
        getAuth: getAuth,
        loginRoutine: loginRoutine,
        logoutRoutine: logoutRoutine

    }

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
        }  
        return service.firebaseObj;
    }

    function clearUser(){
    	service.user.uid = "";
        service.user.token = "";
        service.user.loginData.email = "",
	    service.user.loginData.password = "",
	   	loginFailed = false,
	    logoutFailed = false,
	    authenticated = false,
	    unAuthRequest = false
    }

    function getUser(){
    	return service.user;
    }

    /**
     *  Authenticate user to database
     *  @param {oject} {email:string, password:string} user's credentials
     *  @return {object} promise containing information about authentication result
     */
    function authWithPassword(user, funcSucc, funcError) {
        var defer;
        defer = $q.defer();
        if (service.firebaseObj){
            service.firebaseObj.authWithPassword(user, function onAuth(err, user) {
                if (err) {
                    service.user.loginFailed = true;
                    defer.resolve(true);
                }
                if (user) {
                    defer.reject();
                }
            });
        } 
        return defer.promise;
    }

    /**
     *  Unauthenticate user from database
     */
    function unAuth() {
        service.user.unAuthRequest = true;
        service.firebaseObj.unauth();
    }

    function getAuth(){
        if(service.firebaseObj != null){
            service.firebaseAuthObj = $firebaseAuth(service.firebaseObj);
            return service.firebaseAuthObj;
        }
    }

    /**
     *  Sets application to logged / notlogged mode after authentication process. 
     *  If a user is authenticated and his current location is 'intro', user is redirected to notes overview.
     *  @param {object} contains authentication data.
     */
    function loginRoutine(authData) {
        service.user.uid = authData.uid;
        service.user.token = authData.token;
        service.user.loginFailed = false;
        service.user.authenticated = true;
        service.user.loginData.password = "";
    }

    /**
     *  Sets application to notlogged mode. 
     *  If user's session expires, user is informed about session expiration.
     *  If a user requested log out, user is informed about logout.
     */
    function logoutRoutine() {
        service.user.unAuthRequest = false;
        service.user.authenticated = false;
        service.user.uid = "";
        service.user.token = "";
    };

   
}
