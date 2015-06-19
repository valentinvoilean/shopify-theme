@shop = @shop ? {}

@shop.ChangeCurrency = do ($ = jQuery) ->

  #private
  _o =
    element: "#topnav"
    currencyBaseClass: ".currency__base"
    currencyItemClass: ".currency__item"
    currencyListClass: ".currency__list"
    currencyValueClass: ".currency__value"
    hiddenSelectElementClass: ".currency-picker"

  _updateElements = () ->
    $el = $(_o.element)
    _o.currencyBase = $el.find _o.currencyBaseClass
    _o.currencyList = $el.find _o.currencyListClass
    _o.currencyItem = $el.find _o.currencyItemClass
    _o.currencyValue = $el.find _o.currencyValueClass
    _o.hiddenSelectElement = $el.find _o.hiddenSelectElementClass

  _checkLocalstorage = () ->
    storageValue = localStorage.getItem "currency"
    if storageValue isnt null then _o.currencyValue.text storageValue

  _addEvents = () ->
    _o.currencyBase.on 'click', () ->
      _o.currencyList.stop(true,true).slideToggle("fast")

    _o.currencyItem.on 'click', () ->
      _o.currencyValue.text $(@).text() # Update the custom dropdown value
      localStorage.setItem("currency", $(@).text()); # Update the local storage
      _o.hiddenSelectElement # update & trigger the hidden select element
        .val $(@).text()
        .trigger "change"

  # public
  init: (options)->
    $.extend _o, options
    _updateElements()
    _checkLocalstorage()
    _addEvents()