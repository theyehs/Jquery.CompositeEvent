> This JQuery plugin is a product of Pearl.com 2012 Developer Hackathon. Thank you Pearl.com for devoting costly engineer times to open source projects.


# JQuery Fancy Event

It is a JQuery plugin that extends Jquery's default event handling logic to allow defining listener method for multiple sequential and non-sequential events handling, and event handler invocation that have ordered by priority.


## Supported JQuery version
$.fancyOn works for JQuery 1.7+. Support for previous JQuery versions in progress.


## Method definition

	jQuery.fancyOn([option], events [, selector] [, data] , handler(eventObject) )
	
**option** the configuration object to refine the handler logic. option.priority (integer) defines the handler's priority list; and option.forceOrder (boolean) 

**events** is either a string of event name, or an array of event names. It cannot be an associative array.

The rest of parameter list is very similar to that of jQuery.on(). Please refer to http://api.jquery.com/on/ for details.


## How to install

Include `jquery.fancyevent.js` to your HTML after Jquery

	<script type='text/javascript' src='jquery-1.x.x.js'></script>
	<script type='text/javascript' src='jquery.fancyevent.js'></script>

This gives all JQuery elements access to `fancyOn()` method


## Complementing JQuery's event system


This plugin attempts to add a few features that JQuery, as of version 1.8, doesn't provide.

#### Programmatically change the execution order of a event's handlers

**How does it work:** The priority of a handler is specified by the `priority` option. Higher the priority sooner the handle will execute. Handlers with the same priority are executed in the order of binding. Handlers with unspecified priority has the priority value of 0. It's possible for priority to have a negative value.

	$('#submitButton').fancyOn({ priority: 10 }, 'click', function() {
		// execute code before all other 'click' handlers
	});


**Why is it useful:** By default, handlers bound to an event are executed by the order of binding. However, when handlers are declared across multiple .js files and the inclusion of those .js files outside a developer's control, as does the handlers' execution order. And there are cases where maintaining a specific order is important:

*	Some handlers are costly to execute. As a performance fanatic you want to execute them last.

*	You want to make change to an existing handler but don't want to change its source code. Instead you want to execute some code prior to the said handler, to change the latter's behavior.

*	One handler has data dependency on another handler. You want to explicitly force the second handler to run before the first.


#### Listener for a sequence of events

**How does it work:** Use the `forceOrder` option to have the handler tracks when all the events are fired in the specific order.

	$someEl.fancyOn({ forceOrder: true}, ['evt1', 'evt1', 'evt2', 'evt3'], function(e) {
		//
	});
	
Assuming $someEl fires evt2, evt1, evt2, evt1, evt2, evt2, evt3 in succession, the handler above will execute on evt3. 
	
**Why is it useful:** Sometimes an application's control flow grows so complex, it becomes messy to set up and track a new event for each path of execution. An alternative is to break down 

	// instead of 
	$someEl.on('', callback);

	// you can do
	$someEl.fancyOn({forceOrder: true}, ['stage1On', 'stage2On', ...], callback);

+Sometimes a event handler only executes under certain conditions, instead of doing the check on the event handler, make it a predeccessor event.

+One of your unit tests requires multi-step verification, you can put the assertion statement within the fancyOn handler.

+

#### Listener for an orderless list of events

**How does it work:** It's similar to the ordered version, without the `forceOrder` option.

	$someEl.fancyOn(['evt1', 'evt1', 'evt2', 'evt3'], callback);

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


## More Usages

