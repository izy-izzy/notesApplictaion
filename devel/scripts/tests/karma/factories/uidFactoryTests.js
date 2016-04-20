
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
