module("Ordered multi event handler");

test( "Handle fancyOn({forceOrder: true}, [event1, event2], callback)", function() {
	expect(3);

	var $obj = $({}), output = '';
	$obj.fancyOn({forceOrder: true}, ['event1', 'event2'], function() {
		output += 'a';
	});
	$obj.trigger('event2');
	$obj.trigger('event1');
	equal(output, '', "see if it still handle out of sequence events");
	
	///////////
	var $obj = $({}), output = '';
	$obj.fancyOn({forceOrder: true}, ['event1', 'event2'], function() {
		output += 'a';
	});
	$obj.trigger('event1');
	$obj.trigger('event2');
	equal(output, 'a', "see it works normally");
		
	///////////		
	var $obj = $({}), output = '';
	$obj.fancyOn({forceOrder: true}, ['event1', 'event2'], function() {
		output += 'a';
	});
	$obj.fancyOn({forceOrder: true}, ['event2', 'event1'], function() {
		output += 'b';
	});
	$obj.trigger('event1');
	$obj.trigger('event2');
	$obj.trigger('event2');
	$obj.trigger('event1');
	$obj.trigger('event1');
	$obj.trigger('event2');
	equal(output, 'aba', "a very complex case");
});
