/**
 *  Karma/Jasmine test works
 */
it('Karma and Jasmine runs properly', function() {
    var run = true;
    expect(run).toEqual(true);
});

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
        var noteController = $controller('noteController', { $scope: $scope });
        var notesController = $controller('notesController', { $scope: $scope });
    });
});

/**
 *  Testing Date Filter 
 */
describe('Filter tests', function() {
    beforeEach(module('notesApp'));

    var $filter;

    beforeEach(inject(function(_$filter_) {
        $filter = _$filter_;
    }));

    it('returns "1/1/1970 at 00:00" when given 1 ms', function() {
        var customDateFilter = $filter('customDateFilter');
        expect(customDateFilter(1)).toEqual("1/1/1970 at 00:00");
    });
});
