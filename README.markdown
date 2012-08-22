> This JQuery plugin is a product of Pearl.com 2012 Hackathon.


# JQuery Fancy Event

It is a JQuery plugin that extends Jquery's default event handling logic. The current version allows defining listener for multiple events, and reordering the listener queue for an event.


## Supported JQuery version
$.fancyOn works for JQuery 1.7+. Support for previous JQuery versions is in progress.


## Method definition

	jQuery.fancyOn([option], events [, selector] [, data] , handler(eventObject) )
	
**option** is the configuration object to refine the handler logic.
*	option.priority (integer) defines the handler's priority list, default at 0
*	option.forceOrder (boolean) configures if the handler would fire on ordered sequence of events, default at false
*	option.numUsage (positive integer) defines the max time this listener would execute, default at unlimited
*	option.expireTime (positive integer) tells the lifetime (in millisecond) of this listener. When timer expires this timer will be disabled.

**events** is either a string of event name, or an array of event names. It cannot be an associative array.

The rest of parameter list is similar to that of jQuery.on(). Please refer to http://api.jquery.com/on/ for details.


## How to install

Include `jquery.fancyevent.js` to your HTML after Jquery

	<script type='text/javascript' src='jquery-1.x.x.js'></script>
	<script type='text/javascript' src='jquery.fancyevent.js'></script>

This gives all JQuery elements access to the `fancyOn()` method


## Complementing JQuery's event system

This plugin attempts to add a few features that JQuery, as of version 1.8, lacks.

### Programmatically changing the execution order of a event's handlers

**How does it work:** With fancyOn(), the priority of a handler can be changed by the `priority` option (which default at 0). The higher the priority the sooner the handler executes. Handlers with the same priority are executed in the order of binding. It's possible for priority to have a negative value.

	$('#submitButton').fancyOn({ priority: 10 }, 'click', function() {
		// execute code before all other 'click' handlers on this element
	});


**Why is it useful:** By default, handlers bound to an event are executed by the order of binding. However, when handlers are declared across multiple .js files and the inclusion of those .js files difficult to be tracked of, the handlers' execution order becomes uncertain. There are some cases where maintaining a specific order is important:

*	Some handlers are costly to execute. As a performance fanatic you want to execute them last.

*	You want to make change to an existing handler but don't want to change its source code. Instead you want to include a patch .js file, which would execute code prior to the said handler, to change the latter's behavior.

*	There is one handler which depends on the data that another handler creates. You want to explicitly force the second handler to run before the first.


### Listener for a sequence of events

**How does it work:** Use the `forceOrder` option to have the listener to track if all the events are fired in the specific order.

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

**Why is it useful:** In many cases we cannot precisely predict the firing order of events. For example, users may randomly interact with the page, or callbacks to asychronous operations may come back in undeterministic order. Consider the case where you need to combine data from multiple AJAX calls, then use that data to render a data table. Instead of putting a check on every AJAX success callback to see if the full data is ready, `fancyOn()` helps abstract the tracking and provide a cleaner API.


## Usage Examples

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