> This JQuery plugin is a product of Pearl.com 2012 Developer Hackathon. Thank you Pearl.com for devoting costly engineer times to open source projects.


# Fancy handler

A JQuery plugin that extends Jquery's default event handling logic to allow defining listener method for multiple sequential and non-sequential events handling, and event handler invocation that have ordered by priority.


## Supported JQuery version

## How to install

Include `jquery.fancyevent.js` to your HTML after Jquery

	<script type='text/javascript' src='jquery-1.x.x.js'></script>
	<script type='text/javascript' src='jquery.fancyevent.js'></script>
	
This gives you access to `$el.fancyOn()` method

## Complementing JQuery's event system

This plugin attempts to add a few features that JQuery, as of version 1.8, doesn't provide.

#### Change the order of listener execution

**How does it work:** Pass a integer value to the `priority` option, the higher the priority the sooner it will be executed. Handlers with the same priority are executed in the order of binding. Handlers with unspecified priority and handlers bounded not by fancyOn has the priority value of 0. It's possible for priority to have a negative value.

	$('#submitButton').fancyOn({ priority: 10 }, 'click', function() {
		// something that would happen before all other 'click' handlers
	});


**Why is it important:** By default, firing an event causes handlers bound to this event to execute, following the bound order of the handlers. This approach works well, if we can assume no dependency between handlers, nor requirement for the execution order of the handlers. However, in some cases we don't have the luxury of such assumptions:

+Some handlers incur heavy performance costs. So we want to move the lighter handlers to execute early.

+


#### Listener for a sequence of events
**Why is it useful:** Sometimes an application's control flow grows so complex, it becomes messy to set up of a new event for each path of execution. If nstead of keeping tracking of and firing '
Such listener

A suggested pattern is to create events that are only fired under certain conditions, then use those 'conditioned' events as prerequisite to other events. Say you have a webform where the user wants to , traditionally you would do

	$('#submitButton').on('click', function() {
		// check if the 
		if () {
		
		
		}
		
			return;
		
	});


This approach works perfectly, The code base would be ho

	$pageObj.fancyOn(['', ''], function() {
	
	});


#### Listener for multiple events

**Why is it useful:** There may want 


Furthermore, in applications that heavily relied on web service data


Being able to execute code when multiple events are triggered becomes important where the order of event firing is no longer deterministic. 



`$el.fancyOn(['evt1', 'evt2'], callback)` is merely a fancy

If all events are triggered in deterministic order, then being able to do `fancyOn(['evt1', 'evt2'])` won't give us much more than a 


It's not unusual to see multiple asynchronous invocations fired. With the result of the methods coming back asynchronously, we cannot determine 

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



**How do we do it:** 

	// specify a integer priority value to the listener
	$(document).fancyOn({ priority: 33}, 
	

## More Usages

