Shop.Init = (function ($) {
    var _addEvents, _documentReadyList, _loadModulesOnDocumentReady, _loadModulesOnWindowLoad, _windowOnLoadList;

    _documentReadyList = [
        {
            name: 'Breakpoints'
        },
        {
            name:    'MyAccount',
            options: '#topnav .myAccount'
        }
    ];

    _windowOnLoadList = [
        {
            name:    'ChangeCurrency',
            options: '#topnav .currency__base'
        }
    ];

    _loadModulesOnDocumentReady = function () {
        var i, module;

        for (i = 0; i < _documentReadyList.length; i++) {
            module = _documentReadyList[i];
            if (typeof Shop[module.name] !== 'undefined') {
                Shop[module.name].init(module.options);
            }
        }
    };

    _loadModulesOnWindowLoad = function () {
        var i, module;

        for (i = 0; i < _windowOnLoadList.length; i++) {
            module = _windowOnLoadList[i];
            if (typeof Shop[module.name] !== 'undefined') {
                Shop[module.name].init(module.options);
            }
        }
    };

    _addEvents = function () {
        $(document).ready(_loadModulesOnDocumentReady);
        $(window).load(_loadModulesOnWindowLoad);
    };

    return _addEvents;
})(jQuery);
