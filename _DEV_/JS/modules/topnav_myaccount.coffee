###
  Currency Module - horizontal & vertical flyouts
###

@Shop.Myaccount = do ($ = jQuery) ->

  #private
  _$el = null
  _o = {}


  _updateElements = () ->

  _addEvents = () ->

  # public
  init: (element)->
    _$el = $(element);

    if _$el.length
      _updateElements()
      _addEvents()