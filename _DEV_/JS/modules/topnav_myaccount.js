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
            lightboxClass: '.MA-lightbox',
            lightboxWrapperClass: '.MA-lightboxWrapper',
            lightboxCloseButtonClass: '.MA-closeBtn'
        },

        _updateElements = function () {
            _o.lightboxLinks = _$el.find(_o.lightboxLinksClass);
            _o.lightbox =  _$el.find(_o.lightboxClass);
            _o.lightboxWrapper = _o.lightbox.find(_o.lightboxWrapperClass);
            _o.lightboxCloseButton = _o.lightbox.find(_o.lightboxCloseButtonClass);
            _o.lightboxInput = _o.lightbox.find('input');

            if (_o.lightboxLinks.length) {
                _o.loginLink = _o.lightboxLinks.find(_o.loginLinkClass);
                _o.registerLink = _o.lightboxLinks.find(_o.registerLinkClass);
            }

        },

        _displayLightBox = function () {
            _o.lightbox.toggle();
            _o.lightboxWrapper.toggleClass('animate');
        },

        _loginLightBox = function (e) {
            e.preventDefault();
            _displayLightBox();
        },

        _registerLightBox = function (e) {
            e.preventDefault();
            _displayLightBox();
        },

        _activateInput = function () {
            $(this).parent().addClass('is-active');
        },

        _deactivateInput = function () {
            if (!$(this).val()) $(this).parent().removeClass('is-active');
        },

        _addEvents = function () {

            if (_o.lightboxLinks.length) {
                _o.loginLink.on('click', _loginLightBox);
                _o.registerLink.on('click', _registerLightBox);
                _o.lightboxCloseButton.on('click', _displayLightBox);
                _o.lightboxInput.on('focus', _activateInput);
                _o.lightboxInput.on('blur', _deactivateInput);
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