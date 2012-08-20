> This project is the result of a Hackathon organized by my company, Pearl.com, without its investment of engineering time this project would not have happened.

# Fancy handler

A JQuery plugin that extends its built-in event handling logic to allow multiple sequential and non-sequential events handling, and event handler invocation that have ordered by priority.

## Supported JQuery version


## How to install

Include `jquery.fancyevent.js` to your HTML after Jquery

	<script type='text/javascript' src='jquery-1.x.x.js'></script>
	<script type='text/javascript' src='jquery.fancyevent.js'></script>
	
Doing so would give you	access to `$el.fancyOn()` method

## Complementing JQuery's event system

The incentive for this project comes with what Jquery (as of 1.8) fails to provide:

#### Callback that invokes when more than one events are fired

**Why is it important:** It's not unusual to see multiple asynchronous invocations fired. With the result of the methods coming back asynchronously, we cannot determine 

Say you need to render a data table where its data content comes from a web service, and its filter options comes from another web service. You should only start render the data table when both web services response come back.

The old way have you create a counter, and on each successful Ajax response you increment its value by 1 AND check if it has reached the number of required responses. If so, you render the table. Or, you can do this:

	// create an empty JQuery object
	var $pageObj = $({});
	$pageObj.fancyOn(['webservice1Done', 'webservice2Done'], function(e) {
	
	});
	
	$.ajax({
		url: 'webservice1URL',
		success: function(data) {
			$pageObj.trigger('webservice1Done', data);
		}
	});

	$.ajax({
		url: 'webservice2URL',
		success: function() {
			$pageObj.trigger('webservice2Done', data);
		}
	});


#### Listeners for multiple events are fired in a particular sequence

**Why is it important:** Sequenced event detection shines in writing unit tests, where confirming the execution order of events are basis of tests. Imagine 

	var $ahref = $("#);
	
#### Change the order of listener execution

**Why is it important:** By default, listeners to the same event are fired by the order they were bound. 


**How do we do it:** 

	// specify a integer priority value to the listener
	$(document).fancyOn({ priority: 33}, 
	
