/**
 * My Account Module
 * - initialize lightbox & flyout submodules
 */

var Shop = (function (parent, $) {

	var MyAccount = parent.MyAccount = parent.MyAccount || {},

        _$el = null,

        _o = {
            lightBoxClass:    '.lightBox__base',
            flyoutLinksClass: '.MA-flyoutLinks'
        },

        _updateElements = function () {
            _o.lightbox = _$el.find(_o.lightBoxClass);
        };

    MyAccount.init = function (element) {
        _$el = $(element);

        if (_$el.length) {
            _updateElements();

            if (_o.lightbox.length) Shop.MyAccount.Lightbox.init(_$el);
        }
    };

	return parent;

}(Shop || {}, jQuery));