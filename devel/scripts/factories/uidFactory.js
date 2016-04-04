 /**
 * @ngdoc service
 * @name notesApp.service:uidFactory
 * @description Factory for userID random generation.
 * @function
 */
angular
	.module('notesApp')
	.factory("uidFactory", uidFactory);

function uidFactory() {
	var factory = {
		getUID : getUID,
		getS4 : getS4
	};
	return factory;

 	/**
	 * @ngdoc method
	 * @name getS4
	 * @methodOf notesApp.service:uidFactory
	 * @description Get pseudorandom S4 chunk
	 * @returns {string} format: <code>XXXX</code>; X represents a letter or a cypher
	 */
	function getS4() {
		return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
	}

 	/**
	 * @ngdoc method
	 * @name getUID
	 * @methodOf notesApp.service:uidFactory
	 * @description Get pseudorandom getUID
	 * @returns {string} format: <code>XXXXXXXX-XXXXXXXX-XXXXXXXX</code>; X represents a letter or a cypher
	 */
	function getUID() {
		return factory.getS4() + factory.getS4() + '-' + factory.getS4() + factory.getS4() + '-' + factory.getS4() + factory.getS4();
	}
}
