/**
* @ngdoc service
* @name notesApp.service:logService
* @function
*
* @description Service for firebase logging. Responsible for logging operations.
*
* @requires angularfire
* @requires notesApp.service:uidFactory
*/
angular
   .module('notesApp')
   .service('logService', logService);

logService.$inject = ['$firebaseArray', '$firebaseObject', '$q', 'uidFactory'];

function logService($firebaseArray, $firebaseObject, $q, uidFactory) {
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
	 * @param {string} text that should be send to log.
	 * @param {object} node that should be attached to log.
	 * @param {object} user which done the operation.
	 */
	function log(text, node, user){
		if (service.firebaseObj){
			var logNote = {
				text: text,
				time: Date.now(),
				userId: user.uid,
				node: nodeToString(node)
			};
			var fb = service.firebaseObj.child("log").child(Date.now() + "_" + user.uid + uidFactory.getS4());
			return fb.set(logNote);
		}
	}

	/**
	 * @ngdoc method
	 * @name nodeToString
	 * @methodOf notesApp.service:logService
	 * @description Convert object to string.
	 * @param {object} node Object that will be converted.
	 */
	function nodeToString(node){
		var returnStr = "";
		if (node){
			returnStr = JSON.stringify(node);
		}
		return returnStr;
	}
}
