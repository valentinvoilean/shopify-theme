@shop = @shop ? {}

@shop.ChangeCurrency = do ($ = jQuery) ->

  #private
  _options =
    currencyFormat: ""
    shopCurrency: ""


  # public
  init: (options)->
    $.extend _options, options