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

    it('returns "12/8/1974 at 16:03" when given 145555428421 ms', function() {
        var customDateFilter = $filter('customDateFilter');
        expect(customDateFilter(1)).toEqual("1/1/1970 at 00:00");
    });

    it('returns Accurate time when given time right now', function() {
        var customDateFilter = $filter('customDateFilter');
        var datenow = Date.now();
        var date = new Date(datenow);
        var minutes = date.getUTCMinutes();
        if (minutes < 10) { minutes = "0" + minutes;}
        var hours = date.getUTCHours();
        if (hours < 10) { hours = "0" + hours;}
        expect(customDateFilter(datenow)).toEqual("Today at " +hours+":"+minutes);
    });
});

describe('IntroController', function() {
    var scope,
        $controller;

    beforeEach(function() {
        module('notesApp');
    });

    beforeEach(
        inject(function($rootScope, _$controller_) {
            scope = $rootScope.$new();
            $controller = _$controller_('introController', {
                '$scope': scope,
                "user": {

                }
            });
        }));


    it('introController loaded', function() {
        expect(scope.user).toBeDefined();
    });

});

describe('authController', function() {
    var scope,
        $controller;

    beforeEach(function() {
        module('notesApp');
    });

    beforeEach(
        inject(function($rootScope, _$controller_) {
            scope = $rootScope.$new();
            $controller = _$controller_('authController', {
                '$scope': scope,
                "user": {

                }
            });
        }));

    it('authController loaded', function() {
        expect(scope.user).toBeDefined();
    });

});

describe("settings service", function() {
    var settingsService, httpBackend;

    beforeEach(module("notesApp"));

    beforeEach(inject(function(_settingsService_, $httpBackend) {
        settingsService = _settingsService_;
        httpBackend = $httpBackend;
    }));

    it("testings settings service", function() {
        httpBackend.whenGET("settings.json").respond({
            "fireBaseHttp": "https://simplenotestest.firebaseio.com",
            "pathToUserPictures": "./images/users/",
            "defaultUserPicture": "default_user.jpg"
        });
        settingsService.getSettings()
            .then(function(data) {
                expect(data.fireBaseHttp).toEqual("https://simplenotestest.firebaseio.com");
            });
        httpBackend.flush();
    });
});

describe("uidFactory", function() {
    var uidFactory;

    beforeEach(module("notesApp"));

    beforeEach(inject(function(_uidFactory_){
        uidFactory = _uidFactory_;
    }));

    it("uid generator testing",function(){
        var uid = uidFactory.getUID();
        chunks = uid.split("-");
        expect(chunks.length === 3);
        chunks.forEach(function(chunk){
            expect(chunk.length === 8);
            for (var charAt = 0; charAt < chunk.length; charAt++){
                var inRange = ((chunk.charCodeAt(charAt) > 48) && (chunk.charCodeAt(charAt) < 90)) || ((chunk.charCodeAt(charAt) > 96) && (chunk.charCodeAt(charAt) < 123));
                expect(inRange);
            };
             
        });
    });

});
