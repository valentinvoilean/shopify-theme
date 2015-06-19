@shop = @shop ? {}

@shop.ChangeCurrency = do ($ = jQuery) ->

  #private
  _options =
    currencyFormat: ""
    shopCurrency: ""
    money_with_currency_format: ""
    money_format: ""
    defaultCurrency: ""
    cookieCurrency: "",
    currencyBaseClass: ".currency__base"
    currencyListClass: ".currency__list"
    currencyListItem: ".currency__item"

  _setDefaults = () ->
    Currency.format = _options.currencyFormat

    ### Sometimes merchants change their shop currency, let's tell our JavaScript file ###
    Currency.moneyFormats[_options.shopCurrency].money_with_currency_format = _options.money_with_currency_format
    Currency.moneyFormats[_options.shopCurrency].money_format = _options.money_format

  _resetCustomerAccountPages = ()->
    ### Fix for customer account pages ###
    $("span.money span.money").each () ->
      $(@).parents("span.money").removeClass "money"

    ### Saving the current price ###
    $("span.money").each () ->
      $(@).attr "data-currency-#{ _options.shopCurrency }", $(@).html()

  _checkCookie = ()->
    if _options.cookieCurrency is null
      if _options.shopCurrency isnt _options.defaultCurrency
          Currency.convertAll _options.shopCurrency, _options.defaultCurrency
      else Currency.currentCurrency = _options.defaultCurrency
    else if $("[name=currencies]").size() and $("[name=currencies] option[value=#{_options.cookieCurrency}]").size() is 0
      Currency.currentCurrency = _options.shopCurrency
      localStorage.setItem "currency", _options.shopCurrency
    else if _options.cookieCurrency is _options.shopCurrency
      Currency.currentCurrency = _options.shopCurrency
    else Currency.convertAll _options.shopCurrency, _options.cookieCurrency

  _addEvents = () ->
    $("[name=currencies]").val(Currency.currentCurrency).change ()->
      newCurrency = $(@).val()
      Currency.convertAll Currency.currentCurrency, newCurrency
      $(".currency__selected").text Currency.currentCurrency

    original_selectCallback = window.selectCallback
    selectCallback = (variant, selector) ->
      original_selectCallback(variant, selector)
      Currency.convertAll _options.shopCurrency, $("[name=currencies]").val()
      $(".currency__selected").text Currency.currentCurrency

    $("body").on "ajaxCart.afterCartLoad", () ->
        Currency.convertAll _options.shopCurrency, $("[name=currencies]").val()
        $(".currency__selected").text Currency.currentCurrency

    $(".currency__selected").text(Currency.currentCurrency);




    $(_options.currencyBaseClass)
      .on 'mouseenter', () ->
        $('.currency__list').stop(true,true).slideDown()
      .on 'mouseleave', () ->
        $('.currency__list').stop(true,true).slideUp()

    $('.currency__item').on 'click', () ->
      $('.currency__base').trigger('mouseleave')
      newCurrency = $(@).html()
      Currency.convertAll Currency.currentCurrency, newCurrency
      $(".currency__selected").text Currency.currentCurrency





  # public
  init: (options)->
    $.extend _options, options
    _setDefaults()
    _resetCustomerAccountPages()
    _checkCookie()
    _addEvents()
  options: _options