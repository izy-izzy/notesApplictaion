/**
 * @ngdoc service
 * @name notesApp.service:authService
 * @function
 *
 * @description
 * Authorize user and CRUD his data.
 *
 * @requires angularfire
 *
 */
angular
	.module('notesApp')
	.service('authService', authService);

authService.$inject = ['$firebaseArray', '$firebaseObject', '$firebaseAuth', '$q'];

/**
 * @ngdoc property
 * @name .#user
 * @propertyOf notesApp.service:authService
 * @returns {object}
 * <pre>
 * user: {
 *  loginData: {
 *   email: string,
 *   password: string
 *  },
 *  uid: string,
 *  token: string,
 *  loginFailed: boolean,
 *  logoutFailed: boolean,
 *  authenticated: boolean,
 *  unAuthRequest: boolean
 * }
 * </pre>
 */
function authService($firebaseArray, $firebaseObject, $firebaseAuth, $q) {
	var service = {
		firebaseHttp : undefined,
		firebaseObj : undefined,
		firebaseAuthObj : undefined,
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
	};

	return service;

	/**
	 * @ngdoc method
	 * @name setLocation
	 * @param {string} location location of server
	 * @methodOf notesApp.service:authService
	 * @description sets firebaseHttp to given location
	 */
	function setLocation(location) {
		service.firebaseHttp = location;
	}

	/**
	 * @ngdoc method
	 * @name getFirebase
	 * @methodOf notesApp.service:authService
	 * @description returns connection to database
	 * @returns {object} firebaseObj
	 */
	function getFirebase() {
		if (service.firebaseHttp){
			service.firebaseObj = new Firebase(service.firebaseHttp);
		}
		return service.firebaseObj;
	}

	/**
	 * @ngdoc method
	 * @name clearUser
	 * @methodOf notesApp.service:authService
	 * @description clears user
	 */
	function clearUser(){
		service.user.uid = "";
		service.user.token = "";
		service.user.loginData.email = "";
		service.user.loginData.password = "";
		service.user.loginFailed = false;
		service.user.logoutFailed = false;
		service.user.authenticated = false;
		service.user.unAuthRequest = false;
	}

	/**
	 * @ngdoc method
	 * @name getUser
	 * @methodOf notesApp.service:authService
	 * @description returns user
	 * @returns {object} user
	 */
	function getUser(){
		return service.user;
	}

	/**
	 * @ngdoc method
	 * @name authWithPassword
	 * @methodOf notesApp.service:authService
	 * @description Authenticate user to database
	 * @param {object} userdata email:string, password:string user's credentials
	 * @returns {object} promise containing information about authentication result
	 */
	function authWithPassword(user) {
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
	 * @ngdoc method
	 * @name unAuth
	 * @methodOf notesApp.service:authService
	 * @description Unauthenticate user
	 */
	function unAuth() {
		service.user.unAuthRequest = true;
		service.firebaseObj.unauth();
	}

	/**
	 * @ngdoc method
	 * @name getAuth
	 * @methodOf notesApp.service:authService
	 * @description get user authentification with database
	 * @returns {promise} $firebaseAuth
	 */
	function getAuth(){
		if(service.firebaseObj !== undefined){
			service.firebaseAuthObj = $firebaseAuth(service.firebaseObj);
			return service.firebaseAuthObj;
		}
	}

	/**
	 * @ngdoc method
	 * @name getAuth
	 * @methodOf notesApp.service:authService
	 * @description Sets application to logged / notlogged mode after authentication process. If a user is authenticated and his current location is 'intro', user is redirected to notes overview.
	 * @param {object} authData authentication data.
	 */
	function loginRoutine(authData) {
		service.user.uid = authData.uid;
		service.user.token = authData.token;
		service.user.loginFailed = false;
		service.user.authenticated = true;
		service.user.loginData.password = "";
	}

	/**
	 * @ngdoc method
	 * @name getAuth
	 * @methodOf notesApp.service:authService
	 * @description Sets application to notlogged mode. If user's session expires, user is informed about session expiration. If a user requested log out, user is informed about logout.
	 */
	function logoutRoutine() {
		service.user.unAuthRequest = false;
		service.user.authenticated = false;
		service.user.uid = "";
		service.user.token = "";
	}

}
