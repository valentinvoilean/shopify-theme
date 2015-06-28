/*
 Currency Module - horizontal & vertical flyouts
 */

Shop.Myaccount = (function ($) {

    var _$el = null,

        _o = {
            lightBoxNavClass:    '.lightBox__nav',
            flyoutLinksClass:    '.MA-flyoutLinks',
            loginLinkClass:      '.lightBox__loginLink',
            registerLinkClass:   '.lightBox__registerLink',
            lightBoxClass:       '.lightBox__base',
            wrapperClass:        '.lightBox__content',
            closeBtnClass:       '.lightBox__closeBtn',
            submitBtnClass:      '.lightBox__submitBtn',
            switchBtnClass:      '.lightBox__switchBtn',
            checkboxClass:       '.lightBox__checkbox',
            checkboxLabelClass:  '.lightBox__checkboxLabel',
            firstNameInputClass: '.lightBox__input--firstName',
            lastNameInputClass:  '.lightBox__input--lastName',
            titleClass: '.lightBox__hl',
            paragraphClass: '.lightBox__text',
            formClass: '.lightBox__form',
            forgotPasswordLinkClass: '.lightBox__forgotPasswordLink'
        },

        _updateElements = function () {
            _o.lightbox = _$el.find(_o.lightBoxClass);

            if (_o.lightbox.length) {
                _o.lightBoxNav = _$el.find(_o.lightBoxNavClass);
                _o.wrapper = _o.lightbox.find(_o.wrapperClass);
                _o.closeBtn = _o.lightbox.find(_o.closeBtnClass);
                _o.form = _o.lightbox.find('form');
                _o.submitBtn = _o.lightbox.find(_o.submitBtnClass);
                _o.lightboxInput = _o.lightbox.find('input');
                _o.loginLink = _o.lightBoxNav.find(_o.loginLinkClass);
                _o.registerLink = _o.lightBoxNav.find(_o.registerLinkClass);
                _o.checkbox = _o.lightbox.find(_o.checkboxClass);
                _o.checkboxLabel = _o.lightbox.find(_o.checkboxLabelClass);
                _o.switchBtn = _o.lightbox.find(_o.switchBtnClass);
                _o.firstNameInput = _o.lightbox.find(_o.firstNameInputClass);
                _o.lastNameInput = _o.lightbox.find(_o.lastNameInputClass);
                _o.title = _o.lightbox.find(_o.titleClass);
                _o.paragraph = _o.lightbox.find(_o.paragraphClass);
                _o.form = _o.lightbox.find(_o.formClass);
                _o.forgotPasswordLink = _o.lightbox.find(_o.forgotPasswordLinkClass);
            }
        },

        _displayLightBox = function () {
            _o.lightbox.toggle();
            _o.wrapper.toggleClass('animate');
        },

        _switchForm = function (formType) {
            if (formType === 'login') {
                _o.checkboxLabel.hide();
                _o.forgotPasswordLink.show();
                _o.firstNameInput.add(_o.lastNameInput).prop('disabled', true).parent().hide();
                _o.title.text(_o.title.data('login'));
                _o.paragraph.text(_o.paragraph.data('login'));
                _o.submitBtn.text(_o.submitBtn.data('login'));
                _o.switchBtn.text(_o.switchBtn.data('login'));
                _o.form.attr('action', _o.form.data('login'));
            }

            else if (formType === 'register') {
                _o.checkboxLabel.show();
                _o.forgotPasswordLink.hide();
                _o.firstNameInput.add(_o.lastNameInput).prop('disabled', false).parent().show();
                _o.title.text(_o.title.data('register'));
                _o.paragraph.text(_o.paragraph.data('register'));
                _o.submitBtn.text(_o.submitBtn.data('register'));
                _o.switchBtn.text(_o.switchBtn.data('register'));
                _o.form.attr('action', _o.form.data('register'));
            }
            else {
                _o.checkboxLabel.add(_o.forgotPasswordLink).toggle();
                _o.firstNameInput.add(_o.lastNameInput).prop('disabled', function(i, v) { return !v; }).parent().toggle();

                if (_o.title.text() === _o.title.data('login')) _o.title.text(_o.title.data('register'));
                else _o.title.text(_o.title.data('login'));

                if (_o.paragraph.text() === _o.paragraph.data('login')) _o.paragraph.text(_o.paragraph.data('register'));
                else _o.paragraph.text(_o.paragraph.data('login'));

                if (_o.submitBtn.text() === _o.submitBtn.data('login')) _o.submitBtn.text(_o.submitBtn.data('register'));
                else _o.submitBtn.text(_o.submitBtn.data('login'));

                if (_o.switchBtn.text() === _o.switchBtn.data('login')) _o.switchBtn.text(_o.switchBtn.data('register'));
                else _o.switchBtn.text(_o.switchBtn.data('login'));

                if (_o.form.attr('action') === _o.form.data('login')) _o.form.attr('action', _o.form.data('register'));
                else _o.form.attr('action', _o.form.data('login'));
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
            if (!$(this).val()) {
                $(this).parent().removeClass('is-active');
            }
        },

        _detectInput = function () { // Autofill fix
            if ($(this).val()) {
                _activateInput.call(this);
            }
            else {
                _deactivateInput.call(this);
            }
        },

        _submitForm = function () {
            if (_o.checkbox.is(':visible')) {
                if (_o.checkbox.is(':checked')) {
                    _o.form.submit();
                }
                else {
                    alert('Please agree to terms and conditions.');
                }
            }
            else {
                _o.form.submit();
            }
        },

        _addEvents = function () {
            if (_o.lightbox.length) {
                _o.loginLink.on('click', _loginLightBox);
                _o.registerLink.on('click', _registerLightBox);
                _o.closeBtn.on('click', _displayLightBox);
                _o.submitBtn.on('click', _submitForm);
                _o.switchBtn.on('click', _switchForm);
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