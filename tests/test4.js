module("Priority");

test( "Handle fancyOn({priority}, event1, callback", function() {
	expect(2);

	var $obj = $({}), output = '';
	$obj.fancyOn({priority: 3}, 'event1', function() {
		output += 'a';
	});
	$obj.fancyOn({priority: 13}, 'event1', function() {
		output += 'b';
	});
	$obj.fancyOn({priority: -3}, 'event1', function() {
		output += 'c';
	});
	$obj.fancyOn('event1', function() {
		output += 'd';
	});
	$obj.fancyOn({priority: 13}, 'event1', function() {
		output += 'e';
	});
	$obj.trigger('event1');
	equal(output, 'beadc', "see if handlers are fired in order");
	
	///////////
	$obj = $({}), output = '';
	$obj.fancyOn({priority: 'df'}, 'event1', function() {
		output += 'a';
	});
	$obj.fancyOn({priority: 13}, 'event1', function() {
		output += 'b';
	});
	$obj.fancyOn({priority: -3}, 'event1', function() {
		output += 'c';
	});
	$obj.trigger('event1');
	equal(output, 'bac', "see if it can handle invalid priority value");
});
