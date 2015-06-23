###
  Currency Module - horizontal & vertical flyouts
###

@Shop.ChangeCurrency = do ($ = jQuery) ->

  #private
  _o =
    element: "#topnav"
    baseClass: ".currency__base"
    itemClass: ".currency__item"
    verticalListClass: ".currency__verticalList"
    horizontalListClass: ".currency__horizontalList"
    expandedList: "currency__expandedList"
    currencyValueClass: ".currency__value"
    hiddenSelectElementClass: ".currency-picker"

  _updateElements = () ->
    $el = $(_o.element)
    _o.base = $el.find _o.baseClass
    _o.verticalList = $el.find _o.verticalListClass
    _o.horizontalList = $el.find _o.horizontalListClass
    _o.verticalItem = $el.find(_o.verticalListClass).find _o.itemClass
    _o.horizontalItem = $el.find(_o.horizontalListClass).find _o.itemClass
    _o.currencyValue = $el.find _o.currencyValueClass
    _o.hiddenSelectElement = $el.find _o.hiddenSelectElementClass


  _checkLocalstorage = () ->
    storageValue = localStorage.getItem "currency"

    if storageValue isnt null
      _o.currencyValue.text storageValue #update the value after refresh

      _o.verticalItem.show()
      _o.verticalItem.each () -> # hide the active item in the dropdown
        if $(@).text() is storageValue then $(@).hide()

      _o.horizontalItem.removeClass 'currency__active'
      _o.horizontalItem.each () ->
        if $(@).text() is storageValue then $(@).addClass 'currency__active'

    _o.horizontalList.show()

  _updateLocalStorage = (currentElement) ->
    localStorage.setItem("currency", currentElement.text()); # Update the local storage

    _o.hiddenSelectElement # update & trigger the hidden select element
      .val currentElement.text()
      .trigger "change"


  _addTabletEvents = () ->
    _o.base.find('.visible-md').click (e) -> # toggle the vertical flyout on tablet
      e.stopPropagation();
      _o.verticalList.stop(true,true).fadeToggle("fast","linear")

    _o.verticalItem.click () ->
      _o.currencyValue.text $(@).text() # Update the custom dropdown value

      _o.verticalItem.show() # display all the items
      $(@).hide() # hide current item

      _updateLocalStorage($(@))

    $(document).on 'click', () -> # close the currency flyout on clicking outsited of it
      _o.verticalList.stop(true,true).fadeOut("fast","linear")

  _addDesktopEvents = () ->
    _o.horizontalItem.click () ->
      _updateLocalStorage($(@))
      _o.horizontalItem.removeClass('currency__active')
      $(@).addClass 'currency__active'

    _o.horizontalList.click () ->
      $(@).toggleClass _o.expandedList


  _addEvents = () ->
    _addTabletEvents()
    _addDesktopEvents()
    $(window).on 'mqTablet', _checkLocalstorage
    $(window).on 'mqDesktop', _checkLocalstorage


  # public
  init: (options)->
    $.extend _o, options
    _updateElements()
    _checkLocalstorage()
    _addEvents()