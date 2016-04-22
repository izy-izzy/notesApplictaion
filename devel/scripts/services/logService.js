/**
* @ngdoc service
* @name notesApp.service:logService
* @function
*
* @description Service for firebase logging. Responsible for logging operations.
*
* @requires angularfire
* @requires notesApp.service:uidFactory
* @requires notesApp.service:authService
*/
angular
   .module('notesApp')
   .service('logService', logService);

logService.$inject = ['$firebaseArray', '$firebaseObject', '$q', 'uidFactory', 'authService', 'databaseService'];

function logService($firebaseArray, $firebaseObject, $q, uidFactory, authService, databaseService) {
	var service = {
		firebaseHttp : undefined,
		firebaseObj : undefined,
		setFirebase : setFirebase,
		log: log
	};

	return service;

	/**
	 * @ngdoc method
	 * @name setFirebase
	 * @methodOf notesApp.service:logService
	 * @description Sets firebase object.
	 * @param {object} loadedFirebase Already connected firebase object.
	 */
	function setFirebase(loadedFirebase){
		var firebaseLoadedPromise = $q.defer();
		service.firebaseObj = loadedFirebase;
		firebaseLoadedPromise.resolve("success");
		return firebaseLoadedPromise.promise;
	}

	/**
	 * @ngdoc method
	 * @name log
	 * @methodOf notesApp.service:logService
	 * @description Push log into Firebase Database.
	 * <pre>
	 * {
	 *  text: text,
	 *  time: (ms),
	 *  userId: userId,
	 *  userrights: user rights || "N/A"
 	 * }
	 * </pre>
	 * @param {text} Text that should be send to log.
	 */
	function log(text){
		console.log(authService.getUser().uid);
		console.log(databaseService.getUsers());
		var rightslevel;
		if (databaseService.getUser(authService.getUser().uid)){
			rightslevel = databaseService.getUser(authService.getUser().uid).rightslevel;
		} else {
			rightslevel = 'N/A';
		}
		if (service.firebaseObj){
			var logNote = {
				text: text,
				time: Date.now(),
				userId: authService.getUser().uid,
				userrights: rightslevel
			};
			var fb = service.firebaseObj.child("log").child(Date.now() + "_" + authService.getUser().uid);
			return fb.set(logNote);
		}
	}
}
