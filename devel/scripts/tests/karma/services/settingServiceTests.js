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
		settingsService.getSettings().then(
			function(data) {
				expect(data.fireBaseHttp).toEqual("https://simplenotestest.firebaseio.com");
			});
		httpBackend.flush();
	});
});
