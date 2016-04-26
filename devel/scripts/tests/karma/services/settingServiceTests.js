describe("settings service", function() {
	var settingsService, httpBackend;

	beforeEach(module("notesApp"));

	beforeEach(inject(function(_settingsService_, $httpBackend) {
		settingsService = _settingsService_;
		httpBackend = $httpBackend;
	}));

	it("testings settings service", function() {
		httpBackend.whenGET("settings.json").respond({
			"demo" : false,
		    "fireBaseHttp": "https://simplenotestest.firebaseio.com",
			"fireBaseLogHttp": "https://simplenotestest.firebaseio.com",
		    "pathToUserPictures": "./images/users/",
		    "defaultUserPicture": "avatar_default.png",
			"avatars" : [
				"avatar_0.png",
				"avatar_1.png",
				"avatar_2.png",
				"avatar_3.png",
				"avatar_4.png",
				"avatar_5.png"
			]
		});
		settingsService.getSettings().then(
			function(data) {
				expect(data.fireBaseHttp).toEqual("https://simplenotestest.firebaseio.com");
			});
		httpBackend.flush();
	});
});
