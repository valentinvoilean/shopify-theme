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
            lightboxCloseButtonClass: '.MA-closeBtn',
            submitButtonClass: '.MA-lightboxButton1',
            secondButonClass: '.MA-lightboxButton2',
            lightboxFormClass: '.MA-lightboxForm',
            lightboxCheckboxClass: '.MA-lightboxCheckbox',
            lightboxCheckboxLabelClass: '.MA-lightboxCheckboxLabel'
        },

        _updateElements = function () {
            _o.lightbox =  _$el.find(_o.lightboxClass);

            if (_o.lightbox.length) {
                _o.lightboxLinks = _$el.find(_o.lightboxLinksClass);
                _o.lightboxWrapper = _o.lightbox.find(_o.lightboxWrapperClass);
                _o.lightboxCloseButton = _o.lightbox.find(_o.lightboxCloseButtonClass);
                _o.lightboxForm = _o.lightbox.find(_o.lightboxFormClass);
                _o.submitButton = _o.lightbox.find(_o.submitButtonClass);
                _o.lightboxInput = _o.lightbox.find('input');
                _o.loginLink = _o.lightboxLinks.find(_o.loginLinkClass);
                _o.registerLink = _o.lightboxLinks.find(_o.registerLinkClass);
                _o.lightboxCheckbox = _o.lightbox.find(_o.lightboxCheckboxClass);
                _o.lightboxCheckboxLabel = _o.lightbox.find(_o.lightboxCheckboxLabelClass);
                _o.switchFormButton = _o.lightbox.find(_o.secondButonClass);
            }

        },

        _displayLightBox = function () {
            _o.lightbox.toggle();
            _o.lightboxWrapper.toggleClass('animate');
        },

        _switchForm = function(formType) {
            if (formType === 'login') {
                _o.lightboxCheckboxLabel.hide();
            }

            else if (formType === 'register') {
                _o.lightboxCheckboxLabel.show();
            }
            else {
                _o.lightboxCheckboxLabel.toggle()
            }

        },

        _loginLightBox = function (e) {
            e.preventDefault();
            _switchForm('login');
            _displayLightBox();
        },

        _registerLightBox = function (e) {
            e.preventDefault();
            _switchForm('register');
            _displayLightBox();
        },

        _activateInput = function () {
            $(this).parent().addClass('is-active');
        },

        _deactivateInput = function () {
            if (!$(this).val()) $(this).parent().removeClass('is-active');
        },

        _detectInput = function () { // Autofill fix
            if ($(this).val()) _activateInput.call(this);
            else _deactivateInput.call(this);
        },

        _submitForm = function () {
            if (_o.lightboxCheckbox.is(':visible') && _o.lightboxCheckbox.is(':checked'))
                _o.lightboxForm.submit();
            else {
                alert('Please agree to terms and conditions.')
            }
        },

        _addEvents = function () {
            if (_o.lightbox.length) {
                _o.loginLink.on('click', _loginLightBox);
                _o.registerLink.on('click', _registerLightBox);
                _o.lightboxCloseButton.on('click', _displayLightBox);
                _o.submitButton.on('click', _submitForm);
                _o.switchFormButton.on('click', _switchForm);
                _o.lightboxInput.on('focus', _activateInput);
                _o.lightboxInput.on('blur', _deactivateInput);
                _o.lightboxInput.on('change', _detectInput);
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