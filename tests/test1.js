module("make sure fancyOn() does everything on() does");

test( "Handle fancyOn(event, callback)", function() {
	expect(6);

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


	///////////		
	$obj = $({}), output = '';
	$obj.fancyOn({numUsage: 2}, 'event1', function() {
		output += 'a';
	});
	$obj.trigger('event1');
	$obj.trigger('event1');
	$obj.trigger('event1');
	$obj.trigger('event1');
	equal(output, 'aa', "see if numUsage option works");

	///////////		
	$obj = $({}), output = '';
	$obj.fancyOn({numUsage: 0}, 'event1', function() {
		output += 'a';
	});
	$obj.trigger('event1');
	$obj.trigger('event1');
	$obj.trigger('event1');
	$obj.trigger('event1');
	equal(output, '', "see if numUsage option works");


	///////////		
	$obj = $({}), output = '';
	$obj.fancyOn({ expireTime: 1000}, 'event1', function() {
		output += 'a';
	});
	
	$obj.trigger('event1');
	setTimeout(function() {
		$obj.trigger('event1');	
	}, 500);
	setTimeout(function() {
		$obj.trigger('event1');	
		equal(output, 'aa', "see if expireTime option works");
		start();
	}, 1500);
	stop();
});

test("Handling unbinding listeners", function() {
	expect(1);
	
	///////////		
	var $obj = $({}), output = '', handler;
	handler = $obj.fancyOn('event1', function() {
		output += 'a';
	});
	$obj.trigger('event1');
	handler.disable();
	handler.disable();
	$obj.trigger('event1');
	equal(output, 'a', "see if unbinding works");
});


test("Handle fancyOn(event, data, callback)", function() {
	expect(2);
	
	var $obj = $({}), output = '';
	$obj.fancyOn('event1', { xxx: 33 }, function(e, param1) {
		equal(e.data.xxx, 33, "data is passed correctly");
		equal(param1.yyy, 44, "argument is passed correctly");
	});
	$obj.trigger('event1', [{yyy: 44}]);
});