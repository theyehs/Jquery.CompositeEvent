module("make sure fancyOn() does everything on() does");

test( "Handle fancyOn(event, callback)", function() {
	expect(3);

	var $obj = $({}), output = '';
	$obj.fancyOn('event1', function() {
		output += 'a';
	});
	$obj.fancyOn('event1', function() {
		output += 'b';
	});
	$obj.trigger('event1');
	equal(output, 'ab', "see if there 2 handlers on 'event1' event");
	
	///////////
	$obj = $({}), output = '';
	$obj.fancyOn('event1', function() {
		output += 'a';
	});
	$obj.fancyOn('event2', function() {
		output += 'c';
	});
	$obj.fancyOn('event1', function() {
		output += 'b';
	});
	$obj.trigger('event1');
	$obj.trigger('event2');
	equal(output, 'abc', "see if it can handle more than one kind of events");
		
	///////////		
	$obj = $({}), output = '';
	$obj.fancyOn('event1', function() {
		output += 'a';
	});
	$obj.fancyOn('event1', function() {
		output += 'b';
	});
	$obj.trigger('event1');
	$obj.trigger('event1');
	equal(output, 'abab', "see if firing same event twice");
});

test("Handle fancyOn(event, data, callback)", function() {
	expect(2);
	
	var $obj = $({}), output = '';
	$obj.fancyOn('event1', { xxx: 33 }, function(e) {
		equal(e.data.xxx, 33, "data is passed correctly");
	});
	$obj.trigger('event1');
	$obj.trigger('event1');
});