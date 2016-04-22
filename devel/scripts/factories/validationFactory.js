/**
* @ngdoc service
* @name notesApp.service:validationFactory
* @description Factory for validation of Format
* @function
*/
angular
   .module('notesApp')
   .factory("validationFactory", validationFactory);

function validationFactory() {
	var factory = {
		validateEmail : validateEmail,
		validatePhone : validatePhone,
		validateName : validateName,
		validatePassword : validatePassword
	};
	return factory;

	/**
	 * @ngdoc method
	 * @name validateEmail
	 * @methodOf notesApp.service:validationFactory
	 * @description Validates email address
	 * @param {string} email Email to validate
	 * @returns {boolean} true if valid
	 */
	function validateEmail(email) {
		var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
		return email && re.test(email);
	}

	/**
	 * @ngdoc method
	 * @name validatePhone
	 * @methodOf notesApp.service:validationFactory
	 * @description Validates telephone number
	 * @param {string} phonenumber Phone Number to validate
	 * @returns {boolean} true if valid
	 */
	function validatePhone(phonenumberString) {
		var phoneRe = /^[0-9\+\(\)]+$/;
		return phonenumberString && phonenumberString.match(phoneRe);
	}

	/**
	 * @ngdoc method
	 * @name validateName
	 * @methodOf notesApp.service:validationFactory
	 * @description Validates name
	 * @param {string} name Name to validate
	 * @returns {boolean} true if valid
	 */
	function validateName(name){
		var str;
		if (name){
			str = name.replace(/\s+/g, '');
		}
		return name && (str.length > 0);
	}

	/**
	 * @ngdoc method
	 * @name validatePassword
	 * @methodOf notesApp.service:validationFactory
	 * @description Validates name
	 * @param {string} password Password to validate
	 * @returns {boolean} true if valid
	 */
	function validatePassword(password){
		var str;
		if (password){
			str = password.replace(/\s+/g, '');
		}
		return password && (str.length > 0);
	}
}
