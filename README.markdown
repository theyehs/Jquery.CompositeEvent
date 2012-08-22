> This JQuery plugin is a product of Pearl.com 2012 Hackathon.


# JQuery.fancyOn()

It is a JQuery plugin that extends Jquery's default event handling logic. It allows defining listener for multiple events, and reordering the listener queue for an event.


## Supported JQuery version
$.fancyOn works for JQuery 1.7+. Support for previous JQuery versions is in progress.


## Method definition

	jQuery.fancyOn([option], events [, selector] [, data] , handler(eventObject) )
	
**option** is the configuration object to refine the handler logic.
*	option.priority (integer) defines the handler's priority list, default at 0;
*	option.forceOrder (boolean) configures if the handler would fire on ordered sequence of events, default at false;
*	option.numUsage (positive integer) defines the max time this listener would execute, default at unlimited usage;
*	option.expireTime (positive integer) tells the lifetime (in millisecond) of this listener. When timer expires this timer will be disabled;

**events** is either a string of event name, or an array of event names. It cannot be an associative array.

The rest of parameter list is similar to that of jQuery.on(). Please refer to http://api.jquery.com/on/ for details.


## How to install

Include `jquery.fancyevent.js` to your HTML after JQuery core

	<script type='text/javascript' src='jquery-1.x.x.js'></script>
	<script type='text/javascript' src='jquery.fancyevent-1.0.0.js'></script>

This gives all JQuery elements access to the `fancyOn()` method.


## Complementing JQuery's event system

This plugin attempts to add a few features that JQuery, as of version 1.8, lacks.

### Programmatically changing the execution order of a event's handlers

**How does it work:** With fancyOn(), the priority of a handler can be changed by the `priority` option (which default at 0). The higher the priority the sooner the handler executes. Handlers with the same priority are executed in the order of binding. And it's possible for priority to have a negative value.

	$('#submitButton').fancyOn({ priority: 10 }, 'click', function() {
		// execute code before all other 'click' handlers on this element
	});


**Why is it useful:** By default, handlers bound to an event are executed by the order of binding. When handlers are declared across multiple .js files, the invocation order of handlers become dependent on the inclusion order of those .js files, which is sometimes outside a developer's control. Unfortunately, there are some cases where maintaining a specific order is important:

*	Some handlers are costly to execute. As a performance fanatic you want to execute them last.

*	You want to make change to an existing handler but don't instead of changing its source code. Instead you want to include a patch .js file, which would execute code prior to the said handler, to change the latter's behavior.

*	One handler depends on the data that another handler creates. You want to force the second handler to run before the first.


### Listener for a sequence of events

**How does it work:** Use the `forceOrder` option to have the listener to track if all the events are fired in the specific order.

	$someEl.fancyOn({ forceOrder: true}, ['evt1', 'evt1', 'evt2', 'evt3'], callbackFunc);
	
Assuming $someEl fires `evt2`, `evt1`, `evt2`, `evt1`, `evt2`, `evt2`, `evt3` in succession, the handler above will execute upon firing of `evt3`. 

**Why is it useful:** Sometimes an application's control flow grows complex, and a block of code should be executed not only when a particular event is fired, but also when a number of other prerequisites are met. Surely one can add logic within the handler to check for those prerequisites, but then the handler code may become bloated and less readable. `fancyOn()` attempts to offer a way to create more specifically defined event listener.

For example, instead of

	$submitButton.on('click', function() {
		if (dataIsReady()) {
			processForm();
		}
	});

we can alternatively do

	$submitButton.fancyOn({ forceOrder: true}, ['dataReady', 'click'], function(e, dataReady) {
		// dataReady == ['a', 'b']
		processForm();
	});

	........
	// somewhere else in the code
	$submitButton.trigger('dataReady', ['a', 'b']);


### Listener for an unordered list of events

**How does it work:** Setting up this type of listener is similar to its ordered counterpart. Just remove the `forceOrder` option.

	$someEl.fancyOn(['evt1', 'evt1', 'evt2', 'evt3'], callback);

**Why is it useful:** In many cases we cannot precisely predict the firing order of events. For example, users may randomly interact with the page, or callbacks to asychronous operations may come back in undeterministic order. Consider the case where you need to combine data from multiple AJAX calls, then use that data to render a data table. Instead of putting a check on every AJAX success callback to see if the full data is ready, `fancyOn()` helps abstract the tracking and provide a cleaner API.

	$someEl.fancyOn({ expireTime: 5000}, ['webservice1Done', 'webservice2Done', 'webservice3Done'], function(e, data1, data2, data3) {
		// make use of those web service responses
	});


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
	
Tracking multiple occurences of the same event

	$someEl = $({});
	
	//it is okay to listen to same event multiple times
	$someEl.fancyOn(['evt1', 'evt1', 'evt2', 'evt1'], callback);

Create listener that expires

	$someEl = $({});
	
	// this listener only runs once, 
	$someEl.fancyOn({ expireTime: 3000, numUsage: 1}, 'evt1', callbackFunc);
	
	