
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
