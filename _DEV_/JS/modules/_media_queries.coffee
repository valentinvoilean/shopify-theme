###
  Media Query Module - trigger different messages depending on current media query
  Dependencies: enquire.js, MediaMatch polyfill
###

@Shop.Breakpoints = do ($ = jQuery, enquire) ->

  #private
  _o =
    query1: "screen and (max-width: 47.94rem)"
    query2: "screen and (min-width: 48em) and (max-width: 74.94rem)"
    query3: "screen and (min-width: 75em)"

  _handler1 = () ->
    $(window).trigger('mqMobile')

  _handler2 = () ->
    $(window).trigger('mqTablet')

  _handler3 = () ->
    $(window).trigger('mqDesktop')

  _addEvents = () ->
    enquire.register _o.query1, _handler1
    enquire.register _o.query2, _handler2
    enquire.register _o.query3, _handler3

  return _addEvents
