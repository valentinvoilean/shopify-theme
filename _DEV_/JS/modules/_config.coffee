Shop.Init = do ($ = jQuery) ->

  _documentReadyList = [
    {
      name: 'Breakpoints'
    },
    {
      name: 'Myaccount'
      options: '.topnav_myaccount'
    }
  ]

  _windowOnLoadList = [{
    name: 'ChangeCurrency',
    options: '#topnav .currency__base'
  }]

  _loadModulesOnDocumentReady = () ->
    for module in _documentReadyList
      Shop[module.name].init(module.options)

  _loadModulesOnWindowLoad = () ->
    for module in _windowOnLoadList
      Shop[module.name].init(module.options)

  _addEvents = () ->
    $(document).ready _loadModulesOnDocumentReady
    $(window).load _loadModulesOnWindowLoad

  _addEvents