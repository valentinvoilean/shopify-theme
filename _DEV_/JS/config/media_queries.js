/*
 Media Query Module - trigger different messages depending on current media query
 Dependencies: enquire.js, MediaMatch polyfill
 */

Shop.Breakpoints = (function ($, enquire) {
    var _addEvents, _handler1, _handler2, _handler3, _query1, _query2, _query3, _removeEvents;

    _query1 = "screen and (max-width: 47.94rem)";
    _query2 = "screen and (min-width: 48em) and (max-width: 74.94rem)";
    _query3 = "screen and (min-width: 75em)";

    _handler1 = function () {
        return $(window).trigger('mqMobile');
    };

    _handler2 = function () {
        return $(window).trigger('mqTablet');
    };

    _handler3 = function () {
        return $(window).trigger('mqDesktop');
    };

    _addEvents = function () {
        enquire.register(_query1, _handler1);
        enquire.register(_query2, _handler2);
        return enquire.register(_query3, _handler3);
    };

    _removeEvents = function () {
        enquire.unregister(_query1);
        enquire.unregister(_query2);
        return enquire.unregister(_query3);
    };

    return {
        init:    _addEvents,
        destroy: _removeEvents
    };
})(jQuery, enquire);
