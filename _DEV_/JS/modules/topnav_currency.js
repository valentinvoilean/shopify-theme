/**
 * Currency Module
 * - Display the currencies in a horizontal or vertical flyout
 * - Dependencies: jquery.currencies.js
 */

var Shop = (function (parent, $) {

    var ChangeCurrency = parent.ChangeCurrency = parent.ChangeCurrency || {},

        _$el = null,

        _o = {
            verticalWrapperClass:     '.currency__FlyoutDisplay',
            horizontalWrapperClass:   '.currency__inlineDisplay',
            verticalListClass:        ".currency__verticalList",
            horizontalListClass:      ".currency__horizontalList",
            expandedList:             "currency__expandedList",
            itemClass:                ".currency__item",
            currencyValueClass:       ".currency__value",
            hiddenSelectElementClass: ".currency-picker"
        },

        _updateElements = function () {
            _o.verticalList = _$el.find(_o.verticalListClass);
            _o.horizontalList = _$el.find(_o.horizontalListClass);
            _o.verticalItem = _$el.find(_o.verticalListClass).find(_o.itemClass);
            _o.horizontalItem = _$el.find(_o.horizontalListClass).find(_o.itemClass);
            _o.currencyValue = _$el.find(_o.currencyValueClass);
            _o.hiddenSelectElement = $(_o.hiddenSelectElementClass);
            _o.verticalWrapper = _$el.find(_o.verticalWrapperClass);
            return _o.horizontalWrapper = _$el.find(_o.horizontalWrapperClass);
        },

        _checkLocalstorage = function () {
            var storageValue;
            storageValue = localStorage.getItem("currency");
            if (storageValue !== null) {
                _o.currencyValue.text(storageValue);
                _o.verticalItem.show();
                _o.verticalItem.each(function () {
                    if ($(this).text() === storageValue) {
                        return $(this).hide();
                    }
                });
                _o.horizontalItem.removeClass('currency__active');
                _o.horizontalItem.each(function () {
                    if ($(this).text() === storageValue) {
                        return $(this).addClass('currency__active');
                    }
                });
            }
            return _o.horizontalList.show();
        },

        _updateLocalStorage = function (currentElement) {
            localStorage.setItem("currency", currentElement.text());
            return _o.hiddenSelectElement.val(currentElement.text()).trigger("change");
        },

        _addEvents = function () {
            _o.verticalWrapper.click(function (e) {
                e.stopPropagation();
                return _o.verticalList.stop(true, true).fadeToggle("fast", "linear");
            });
            _o.verticalItem.click(function () {
                _o.currencyValue.text($(this).text());
                _o.verticalItem.show();
                $(this).hide();
                return _updateLocalStorage($(this));
            });
            _o.horizontalItem.click(function () {
                _updateLocalStorage($(this));
                _o.horizontalItem.removeClass('currency__active');
                return $(this).addClass('currency__active');
            });
            _o.horizontalList.click(function (e) {
                e.stopPropagation();
                return $(this).toggleClass(_o.expandedList);
            });
            $(document).on('click', function () {
                _o.verticalList.stop(true, true).fadeOut("fast", "linear");
                return _o.horizontalList.removeClass(_o.expandedList);
            });
            $(window).on('mqMobile', _checkLocalstorage);
            $(window).on('mqTablet', _checkLocalstorage);
            return $(window).on('mqDesktop', _checkLocalstorage);
        };

    ChangeCurrency.init = function (element) {
        _$el = $(element);
        if (_$el.length) {
            _updateElements();
            _checkLocalstorage();
            return _addEvents();
        }
    };

    return parent;

}(Shop || {}, jQuery));


