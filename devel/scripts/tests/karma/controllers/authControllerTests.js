describe('authController', function() {
	var scope,
		vm;

	beforeEach(function() {
		module('notesApp');
	});

	beforeEach(
		inject(function($rootScope, _$controller_) {
			scope = $rootScope.$new();
			vm = _$controller_('authController', {
				'$scope': scope,
				"user": {

				}
			});
		}));

	it('authController loaded', function() {
		expect(vm.user).toBeDefined();
	});
});
