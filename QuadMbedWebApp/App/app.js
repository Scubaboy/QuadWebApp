(function () {
    'use strict';

    var app = angular.module('app', [
        // Angular modules 
        'ngAnimate',        // animations
        'ngRoute',         // routing
        //'ngSanitize',       // sanitizes html bindings (ex: sidebar.js)

        //// Custom modules 
        //'common',           // common functions, logger, spinner
        //'common.bootstrap', // bootstrap dialog wrapper functions
        'viewManager',
        'localStore',
        'dragDrop',
        'enumMapper',
        'ConfigurationMapper',
        'configurationManager',
        //// 3rd Party Modules
        'ui.bootstrap',     // ui-bootstrap (ex: carousel, pagination, dialog)
        //'dx'
        //'breeze.angular'
    ]);

    app.value('$', $);

    app.run(['signalRHub', 'signalRHubConfigService', 'ActiveQuadsSigRService', function (signalRHub, signalRHubConfigService, ActiveQuadsSigRService) {
       
        signalRHub.initialise(signalRHubConfigService.sigRHubs);
        ActiveQuadsSigRService.initialise();
        signalRHub.start();
    }]);
})();