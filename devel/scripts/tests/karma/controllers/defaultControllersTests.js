/**
 *  Testing controllers initialisation
 */
describe('Controllers Test', function() {
	beforeEach(module('notesApp'));

	var $controller;

	beforeEach(
		inject(function(_$controller_, $rootScope) {
			$controller = _$controller_;
			$rootScope.settings = {
				fireBaseHttp: 'https://simplenotestest.firebaseio.com',
			}
		}));

	it('Existence of controllers', function() {
		var $scope = {};
		var authController = $controller('authController', { $scope: $scope });
		var addNoteController = $controller('addNoteController', { $scope: $scope });
		var headerController = $controller('headerController', { $scope: $scope });
		var introController = $controller('introController', { $scope: $scope });
		var noteController = $controller('noteController', { $scope: $scope });
		var notesController = $controller('notesController', { $scope: $scope });
		var userSettingsController = $controller('userSettingsController', { $scope: $scope });
	});
});
