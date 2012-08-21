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

test("Handling unbinding listeners", function() {
	expect(1);
	
	///////////		
	var $obj = $({}), output = '', handler;
	handler = $obj.fancyOn(['event1', 'event2'], function() {
		output += 'a';
	});
	$obj.trigger('event1');
	$obj.trigger('event2');
	handler.disable();
	$obj.trigger('event1');
	$obj.trigger('event2');	
	equal(output, 'a', "see if unbinding works");
});

test( "Handle fancyOn([evt1, evt2], callback)", function() {
	expect(5);
	var $obj = $({}), output = '', handler;
	handler = $obj.fancyOn(['event1', 'event2'], function(e) {
		output += 'a';
	});
	$obj.trigger('event1', {});
	$obj.trigger('event2');
	handler.disable();
	$obj.trigger('event1', {});
	$obj.trigger('event2');
	equal(output, 'a', "Making sure disable() works for multiple events");

	///////////////
	$obj = $({}), output = '';
	$obj.fancyOn(['event1', 'event2'], { xxx: 33 }, function(e, event1Data, event2Data) {
		equal(e.data.xxx, 33, "data is passed correctly");
		equal(event1Data[0].data1, 'dog', 'argument is passed correctly');
		equal(event2Data[0].data2, 'cat', 'argument is passed correctly');
		equal(event2Data[1], 'cow', 'argument is passed correctly');
	});
	$obj.trigger('event1', [{data1: 'dog'}]);
	$obj.trigger('event2', [{data2: 'cat'}, 'cow']);
});