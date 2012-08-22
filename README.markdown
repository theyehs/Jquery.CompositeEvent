> This JQuery plugin is a product of Pearl.com 2012 Developer Hackathon. Thank you Pearl.com for devoting costly engineer times to open source projects.


# JQuery Fancy Event

It is a JQuery plugin that extends Jquery's default event handling logic to allow defining listener method for multiple sequential and non-sequential events handling, and event handler invocation that have ordered by priority.


## Supported JQuery version
$.fancyOn works for JQuery 1.7+. Support for previous JQuery versions in progress.


## Method definition

	jQuery.fancyOn([option], events [, selector] [, data] , handler(eventObject) )
	
**option** the configuration object to refine the handler logic.
*	option.priority (integer) defines the handler's priority list
*	option.forceOrder (boolean) configures if the handler would fire on ordered sequence of events

**events** is either a string of event name, or an array of event names. It cannot be an associative array.

The rest of parameter list is very similar to that of jQuery.on(). Please refer to http://api.jquery.com/on/ for details.


## How to install

Include `jquery.fancyevent.js` to your HTML after Jquery

	<script type='text/javascript' src='jquery-1.x.x.js'></script>
	<script type='text/javascript' src='jquery.fancyevent.js'></script>

This gives all JQuery elements access to `fancyOn()` method


## Complementing JQuery's event system

This plugin attempts to add a few features that JQuery, as of version 1.8, lacks.

### Programmatically changing the execution order of a event's handlers

**How does it work:** The priority of a handler is specified by the `priority` option. The higher the priority the sooner the handler executes. Handlers with the same priority are executed in the order of binding. Handlers with unspecified priority has the priority value of 0. It's possible for priority to have a negative value.

	$('#submitButton').fancyOn({ priority: 10 }, 'click', function() {
		// execute code before all other 'click' handlers on this element
	});


**Why is it useful:** By default, handlers bound to an event are executed by the order of binding. However, when handlers are declared across multiple .js files and the inclusion of those .js files outside a developer's control, as does the handlers' execution order. There are some cases where maintaining a specific order is important:

*	Some handlers are costly to execute. As a performance fanatic you want to execute them last.

*	You want to make change to an existing handler but don't want to change its source code. Instead you want to execute some code prior to the said handler, to change the latter's behavior.

*	One handler depends on the data that another handler creates. You want to explicitly force the second handler to run before the first.


### Listener for a sequence of events

**How does it work:** Use the `forceOrder` option to have the handler tracks when all the events are fired in the specific order.

	$someEl.fancyOn({ forceOrder: true}, ['evt1', 'evt1', 'evt2', 'evt3'], callbackFunc);
	
Assuming $someEl fires evt2, evt1, evt2, evt1, evt2, evt2, evt3 in succession, the handler above will execute on firing of evt3. 


**Why is it useful:** Sometimes an application's control flow grows complex, and an event handler's behavior varies depends on external factors. User clicking on the 'I Agree" button may see a popup warning message if a certain checkbox is not p


`{forceOrder:true}` allow setting prerequisites for an event handle

Instead of doing condition check within the handler

	$submitButton.on('click', function() {
		if (dataIsReady()) {
			processForm();
		}
	});


### Listener for an unordered list of events

**How does it work:** Setting up this type of listener is similar to its ordered counterpart. Just remove the `forceOrder` option.

	$someEl.fancyOn(['evt1', 'evt1', 'evt2', 'evt3'], callback);

**Why is it useful:** In many cases we cannot precisely predict events firing order &mdash; users may interact with page elements randomly; or asychronous operations may complete in undeterministic order. Consider:

*	You need to combine data from multiple AJAX calls, then process that data. And since you can't be sure when those web services would come back (if they come back at all!),  and you want to 

*	

## More Usages

Passing data to the handler

	$someEl = $({});
	// single event works the same as jQuery.on()
	$someEl.fancyOn('evt1', function(e, arg1, arg2) {
		// arg1 == 'one', AND arg2 == 'two'
	});
	$someEl.trigger('evt1', ['one', 'two']);
	
	$someEl = $({});
	// multiple events have each arg be a 
	$someEl.fancyOn(['evt1', 'evt2'], function(e, evt1Args, evt2Args) {
		// evt1Args == ['one', 'two'], AND evt2Args == ['three', 'four']
	});
	$someEl.trigger('evt1', ['one', 'two']);
	$someEl.trigger('evt2', ['three', 'four']);	
	
Unbinding a handler

	$someEl = $({});
	
	// fancyOn() returns a listener object where you can call disable() to turn it off
	var $listener = $someEl.fancyOn({priority: -10}, ['evt1', 'evt2'], function(e) {...});
	$listener.disable();
	
	
Tracking multiple occurence of the same event

	$someEl = $({});
	$someEl.fancyOn(['evt1', 'evt1', 'evt2'], callback);