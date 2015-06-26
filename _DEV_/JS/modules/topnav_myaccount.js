/*
 Currency Module - horizontal & vertical flyouts
 */

Shop.Myaccount = (function ($) {
    var _$el, _addEvents, _o, _updateElements;

    _$el = null;
    _o = {};

    _updateElements = function () {
    };

    _addEvents = function () {
    };

    return {
        init: function (element) {
            _$el = $(element);
            if (_$el.length) {
                _updateElements();
                return _addEvents();
            }
        }
    };
})(jQuery);