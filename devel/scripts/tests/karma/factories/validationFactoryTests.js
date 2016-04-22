describe("validationFactory", function() {
	var validationFactory;

	beforeEach(module("notesApp"));

	beforeEach(inject(function(_validationFactory_){
		validationFactory = _validationFactory_;
	}));


// email
	it("Expect 'jane@notes.com' to be valid email.",function(){
		var validEmail = validationFactory.validateEmail("jane@notes.com");
		expect(validEmail);
	});
	it("Expect 'j@n.uk' to be valid email.",function(){
		var validEmail2 = validationFactory.validateEmail("j@n.uk");
		expect(validEmail2);
	});
	it("Expect 'lol' to be non valid email.", function(){
		var validEmail = validationFactory.validateEmail("lol");
		expect(!validEmail);
	});
	it("Expect 'lol@ls' to be non valid email.", function(){
		var validEmail2 = validationFactory.validateEmail("lol@ls");
		expect(!validEmail2);
	});
	it("Expect 'lol@.com' to be non valid email.", function(){
		var validEmail3 = validationFactory.validateEmail("lol@.com");
		expect(!validEmail3);
	});
	it("Expect '@lol.com' to be non valid email.", function(){
		var validEmail4 = validationFactory.validateEmail("@lol.com");
		expect(!validEmail4);
	});
	it("Expect undefined to be non valid email.", function(){
		var validEmail4 = validationFactory.validateEmail(undefined);
		expect(!validEmail4);
	});


//name
	it("Expect 'Jane' to be valid name.", function(){
		var validName = validationFactory.validateName("Jane");
		expect(validName);
	});
	it("Expect ' ' and '' to be not valid names.", function(){
		var validName = validationFactory.validateName(" ");
		expect(!validName);
		var validName2 = validationFactory.validateName("");
		expect(!validName2);
	});
	it("Expect undefined to be not valid name.", function(){
		var validName2 = validationFactory.validateName(undefined);
		expect(!validName2);
	});

// phone number
	it("Expect '+450 456 987 456' to be valid phone number.", function(){
		var validName = validationFactory.validatePhone("+450 456 987 456");
		expect(validName);
	});
	it("Expect ' ' and '' to be not valid phone numbers.", function(){
		var validName = validationFactory.validatePhone(" ");
		expect(!validName);
		var validName2 = validationFactory.validatePhone("");
		expect(!validName2);
	});
	it("Expect '#Jane487' to be not valid phone numbers.", function(){
		var validName3 = validationFactory.validatePhone("#Jane487");
		expect(!validName3);
	});
	it("Expect undefined to be not valid phone numbers.", function(){
		var validName3 = validationFactory.validatePhone(undefined);
		expect(!validName3);
	});


// passWord
	it("Expect 'MyPass89' to be valid password.", function(){
		var validName = validationFactory.validatePassword("MyPass89");
		expect(validName);
	});
	it("Expect ' ' and '' to be not a valied passwords.", function(){
		var validName = validationFactory.validatePassword(" ");
		expect(!validName);
		var validName2 = validationFactory.validatePassword("");
		expect(!validName2);
	});
	it("Expect undefined to be not a valied passwords.", function(){
		var validName = validationFactory.validatePassword(undefined);
		expect(!validName);
	});
});
