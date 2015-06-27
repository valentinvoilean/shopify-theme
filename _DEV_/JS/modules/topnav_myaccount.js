/*
 Currency Module - horizontal & vertical flyouts
 */

Shop.Myaccount = (function ($) {

    var _$el = null,

        _o = {
            loggedInLinksClass: '.MA-loggedInLinks',
            lightboxLinksClass: '.MA-lightboxLinks',
            flyoutLinksClass:   '.MA-flyoutLinks',
            loginLinkClass:     '.MA-loginLink',
            registerLinkClass:  '.MA-registerLink',
            lightboxClass: '.MA-lightbox'
        },

        _updateElements = function () {
            _o.lightboxLinks = _$el.find(_o.lightboxLinksClass);

            if (_o.lightboxLinks.length) {
                _o.loginLink = _o.lightboxLinks.find(_o.loginLinkClass);
                _o.registerLink = _o.lightboxLinks.find(_o.registerLinkClass);
            }

        },

        _displayLightBox = function () {

        },

        _loginLightBox = function (e) {
            e.preventDefault();
            _displayLightBox();
        },

        _registerLightBox = function (e) {
            e.preventDefault();
            _displayLightBox();
        },

        _addEvents = function () {

            if (_o.lightboxLinks.length) {
                _o.loginLink.on('click', _loginLightBox);
                _o.registerLink.on('click', _registerLightBox);
            }
        };

    return {
        init: function (element) {
            _$el = $(element);
            if (_$el.length) {
                _updateElements();
                _addEvents();
            }
        }
    };
})(jQuery);