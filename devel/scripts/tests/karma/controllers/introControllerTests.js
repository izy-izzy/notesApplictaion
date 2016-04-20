describe('IntroController', function() {
	var scope,
		vm;

	beforeEach(function() {
		module('notesApp');
	});

	beforeEach(
		inject(function($rootScope, _$controller_) {
			scope = $rootScope.$new();
			vm = _$controller_('introController', {
				'$scope': scope,
				"user": {}
			});
		}));


	it('introController loaded', function() {
		expect(vm.user).toBeDefined();
	});

});
