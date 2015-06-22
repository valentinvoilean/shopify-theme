query1 = "screen and (max-width: 47.94rem)"
query2 = "screen and (min-width: 48em) and (max-width: 74.94rem)"
query3 = "screen and (min-width: 75em)"

handler1 =
  match : () ->
    $(window).trigger('mqMobile')
  destroy : () ->
    console.log("media query destroyed - mobile")

handler2 =
  match : () ->
    $(window).trigger('mqTablet')
  destroy : () ->
    console.log("media query destroyed - tablet")

handler3 =
  match : () ->
    $(window).trigger('mqDesktop')
  destroy : () ->
    console.log("media query destroyed - desktop")


enquire.register query1, handler1, true
enquire.register query2, handler2, true
enquire.register query3, handler3, true