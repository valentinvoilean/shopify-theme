@Shop = @Shop ? {}

@Shop.ChangeCurrency = do ($ = jQuery) ->

  #private
  _o =
    element: "#topnav"
    currencyBaseClass: ".currency__base"
    currencyItemClass: ".currency__item"
    currencyVerticalListClass: ".currency__verticalList"
    currencyValueClass: ".currency__value"
    hiddenSelectElementClass: ".currency-picker"

  _updateElements = () ->
    $el = $(_o.element)
    _o.currencyBase = $el.find _o.currencyBaseClass
    _o.currencyVerticalList = $el.find _o.currencyVerticalListClass
    _o.currencyItem = $el.find _o.currencyItemClass
    _o.currencyValue = $el.find _o.currencyValueClass
    _o.hiddenSelectElement = $el.find _o.hiddenSelectElementClass


  _checkLocalstorage = () ->
    storageValue = localStorage.getItem "currency"

    if storageValue isnt null then _o.currencyValue.text storageValue #update the value after refresh

    _o.currencyItem.each () ->
      if $(@).text() is storageValue then $(this).hide() # hide the active item in the dropdown


  _addEvents = () ->
    _o.currencyBase.on 'click', (e) ->
      e.stopPropagation();
      _o.currencyVerticalList.stop(true,true).fadeToggle("fast","linear")

    _o.currencyItem.on 'click', () ->

      _o.currencyValue.text $(@).text() # Update the custom dropdown value

      _o.currencyItem.show() # display all the items
      $(@).hide() # hide current item

      localStorage.setItem("currency", $(@).text()); # Update the local storage

      _o.hiddenSelectElement # update & trigger the hidden select element
        .val $(@).text()
        .trigger "change"

    $(document).on 'click', () -> # close the currency flyout on clicking outsited of it
      _o.currencyVerticalList.stop(true,true).fadeOut("fast","linear")


  # public
  init: (options)->
    $.extend _o, options
    _updateElements()
    _checkLocalstorage()
    _addEvents()