###
  Currency Module - horizontal & vertical flyouts
###

@Shop.ChangeCurrency = do ($ = jQuery) ->

  #private
  _$el = null
  _o =
    verticalWrapperClass: '.currency__FlyoutDisplay'
    horizontalWrapperClass: '.currency__inlineDisplay'
    verticalListClass: ".currency__verticalList"
    horizontalListClass: ".currency__horizontalList"
    expandedList: "currency__expandedList"
    itemClass: ".currency__item"
    currencyValueClass: ".currency__value"
    hiddenSelectElementClass: ".currency-picker"
    mobileDisplay: ''
    tabletDisplay: ''
    desktopDisplay: ''

  _updateElements = () ->
    _o.verticalList = _$el.find _o.verticalListClass
    _o.horizontalList = _$el.find _o.horizontalListClass
    _o.verticalItem = _$el.find(_o.verticalListClass).find _o.itemClass
    _o.horizontalItem = _$el.find(_o.horizontalListClass).find _o.itemClass
    _o.currencyValue = _$el.find _o.currencyValueClass
    _o.hiddenSelectElement = $(_o.hiddenSelectElementClass)
    _o.verticalWrapper = _$el.find _o.verticalWrapperClass
    _o.horizontalWrapper = _$el.find _o.horizontalWrapperClass


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

  _configureDisplay = () ->
    $.extend _o, _$el.data('options')

    if _o.mobileDisplay is 'flyout'
      _o.verticalWrapper.addClass 'visible-xs'
    else if _o.mobileDisplay is 'inline'
      _o.horizontalWrapper.addClass 'visible-xs'

    if _o.tabletDisplay is 'flyout'
      _o.verticalWrapper.addClass 'visible-sm'
    else if _o.tabletDisplay is 'inline'
      _o.horizontalWrapper.addClass 'visible-sm'

    if _o.desktopDisplay is 'flyout'
      _o.verticalWrapper.addClass 'visible-md visible-lg'
    else if _o.desktopDisplay is 'inline'
      _o.horizontalWrapper.addClass 'visible-md visible-lg'

  _addEvents = () ->
    _o.verticalWrapper.click (e) -> # toggle the vertical flyout on tablet
      e.stopPropagation()
      _o.verticalList.stop(true,true).fadeToggle("fast","linear")

    _o.verticalItem.click () ->
      _o.currencyValue.text $(@).text() # Update the custom dropdown value

      _o.verticalItem.show() # display all the items
      $(@).hide() # hide current item

      _updateLocalStorage($(@))

    _o.horizontalItem.click () ->
      _updateLocalStorage($(@))
      _o.horizontalItem.removeClass('currency__active')
      $(@).addClass 'currency__active'

    _o.horizontalList.click (e) ->
      e.stopPropagation()
      $(@).toggleClass _o.expandedList

    $(document).on 'click', () ->
      _o.verticalList.stop(true,true).fadeOut("fast","linear") # collapse the vertical flyout
      _o.horizontalList.removeClass _o.expandedList

    $(window).on 'mqMobile', _checkLocalstorage
    $(window).on 'mqTablet', _checkLocalstorage
    $(window).on 'mqDesktop', _checkLocalstorage

  # public
  init: (element)->
    _$el = $(element);

    if _$el.length
      _updateElements()
      _checkLocalstorage()
      _configureDisplay()
      _addEvents()