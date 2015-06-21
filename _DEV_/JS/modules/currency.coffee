@Shop = @Shop ? {}

@Shop.ChangeCurrency = do ($ = jQuery) ->

  #private
  _o =
    element: "#topnav"
    baseClass: ".currency__base"
    itemClass: ".currency__item"
    verticalListClass: ".currency__verticalList"
    currencyValueClass: ".currency__value"
    hiddenSelectElementClass: ".currency-picker"

  _updateElements = () ->
    $el = $(_o.element)
    _o.base = $el.find _o.baseClass
    _o.verticalList = $el.find _o.verticalListClass
    _o.verticalItem = $el.find(_o.verticalListClass).find _o.itemClass
    _o.currencyValue = $el.find _o.currencyValueClass
    _o.hiddenSelectElement = $el.find _o.hiddenSelectElementClass


  _checkLocalstorage = () ->
    storageValue = localStorage.getItem "currency"

    if storageValue isnt null then _o.currencyValue.text storageValue #update the value after refresh

    _o.verticalItem.each () ->
      if $(@).text() is storageValue then $(this).hide() # hide the active item in the dropdown

  _addTabletEvents = () ->
    _o.base.find('.visible-md').on 'click', (e) -> # toggle the vertical flyout on tablet
      e.stopPropagation();
      _o.verticalList.stop(true,true).fadeToggle("fast","linear")

    _o.verticalItem.on 'click', () ->

      _o.currencyValue.text $(@).text() # Update the custom dropdown value

      _o.verticalItem.show() # display all the items
      $(@).hide() # hide current item

      localStorage.setItem("currency", $(@).text()); # Update the local storage

      _o.hiddenSelectElement # update & trigger the hidden select element
        .val $(@).text()
        .trigger "change"

    $(document).on 'click', () -> # close the currency flyout on clicking outsited of it
      _o.verticalList.stop(true,true).fadeOut("fast","linear")

  _addEvents = () ->
    _addTabletEvents()


  # public
  init: (options)->
    $.extend _o, options
    _updateElements()
    _checkLocalstorage()
    _addEvents()