
jQuery.fn.fancyOn = function(fancyOption, events, selector, data, fn) {
	var generateGuid = function() {
		var s4 = function() {
			return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
		}
		return s4()+s4()+s4()+s4();
	};
	
	// based on the absence and type of parameters, reassign/shift them accordingly
	if (typeof fancyOption !== 'object' || $.isArray(fancyOption)) {
		fn = data;
		data = selector;
		selector = events;
		events = fancyOption;
		fancyOption = {};
	}
	if ( data == null && fn == null ) {
		// ( types, fn )
		fn = selector;
		data = selector = undefined;
	} else if ( fn == null ) {
		if ( typeof selector === "string" ) {
			// ( types, selector, fn )
			fn = data;
			data = undefined;
		} else {
			// ( types, data, fn )
			fn = data;
			data = selector;
			selector = undefined;
		}
	}
	if (typeof events === 'string')
		events = [events];


	var eventLen = events.length;
	var $this = this;
	var uniqueEventName = '_fancy' + generateGuid();
	var _matchedEvents, _matchedCount, _nextToMatchIndex;
	var forceOrder = fancyOption.forceOrder;
	var _reset = function() {
		_nextToMatchIndex = 0;
		_matchedEvents = {};
		_matchedCount = eventLen;
		for (var i=0; i<eventLen; i++) {
			var event = events[i];
			if (!_matchedEvents[event])
				_matchedEvents[event] = 1;
			else
				_matchedEvents[event]++;
		}
	};
	_reset();
	$this.on(uniqueEventName, selector, data, fn);
	
	
	var tEvents = [];
	for (var i=0; i<eventLen; i++) {
		var event = events[i];
		if (tEvents.indexOf(event) >= 0)
			continue;
		tEvents.push(event);
		
		var childFn = function(e) {
			var eventName = e.data._fancyOn.eventName;
			if (forceOrder) {
				if (events[_nextToMatchIndex] == eventName) {
					if (++_nextToMatchIndex >= events.length) {
						$this.trigger(uniqueEventName);
						_reset();
					}
				}
			} else {			
				if (_matchedEvents[eventName]) {
					if (_matchedEvents[eventName]) {
						_matchedEvents[eventName]--;
						if (--_matchedCount == 0) {
							$this.trigger(uniqueEventName);
							_reset();
						}
					}
				}
			}
		};
		var childData = $.extend({}, data);
		childData._fancyOn = {
			eventName: event
		};
		childFn._priority = parseInt(fancyOption.priority) || 0;
		$this.on(event, selector, childData, childFn);
		
		// resort the event order for each matched element based on priority
		var matchedEle = $this.get();
		for (var j=0; j<matchedEle.length; j++) {
			var $handlers = (jQuery._data(matchedEle[j], "events") || {})[event] || [];
			if (!$handlers.length) continue;
			$handlers.sort(function(a, b) {
				var aPriority = a.handler._priority || 0,
					bPriority = b.handler._priority || 0;
				return bPriority - aPriority;
			});
		}
	}
};