module("Multi-event listener");

test( "Handle fancyOn([evt1, evt2], callback)", function() {
	expect(9);

	var $obj = $({}), output = '';
	$obj.fancyOn(['event1', 'event2'], function() {
		output += 'a';
	});
	$obj.trigger('event1');
	equal(output, '', "Handler not fired prematurely");
	$obj.trigger('event2');
	equal(output, 'a', "fancyOn([event1, event2] succeed");
	
	///////////
	$obj = $({}), output = '';
	$obj.fancyOn(['event1', 'event1', 'event2'], function() {
		output += 'a';
	});
	$obj.trigger('event1');
	$obj.trigger('event2');
	equal(output, '', "Handle not fired prematurely");
	$obj.trigger('event2');
	equal(output, '', "Handle not fired prematurely");
	$obj.trigger('event1');
	equal(output, 'a', "fancyOn([event1, event1, event2], succeed");
	
	///////////
	$obj = $({}), output = '';
	$obj.fancyOn(['event1'], function() {
		output += 'a';
	});
	$obj.trigger('event1');
	equal(output, 'a', "fancyOn([event1], succeed");
	
	///////////
	$obj = $({}), output = '';
	$obj.fancyOn(['event1', 'event2'], function() {
		output += 'a';
	});
	$obj.trigger('event1');
	$obj.trigger('event1');	
	$obj.trigger('event1');
	$obj.trigger('event2');	
	$obj.trigger('event2');	
	equal(output, 'a', "firing resets the event buffer");
	$obj.trigger('event1');	
	equal(output, 'aa', "repeated firing succeeed");	
	

	/////////////
	$obj = $({}), output = '';
	var $fixture = $('qunit-fixture');
	$fixture.html("<a href='google.com' id='one'></a><a href='yahoo.com' id='two'></a>");
	
	var $href = $('#qunit-fixture a');
	var $firstHref = $('#one');
	
	$firstHref.fancyOn(['click', 'mouseover'], function() {
		output += 'a';
	});
	
	$firstHref.trigger('click');
	$href.trigger('mouseover');
	equal(output, '', "firing by 2 separate elements");	

});

test( "Handle fancyOn([evt1, evt2], callback)", function() {
	expect(0);


});