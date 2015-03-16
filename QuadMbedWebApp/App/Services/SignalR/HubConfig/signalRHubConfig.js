(function () {
    'use strict';

    var serviceId = 'signalRHubConfigService';

    angular.module('app').service(serviceId, ['ActiveQuadsSigRService', signalRHubConfigService]);

    function signalRHubConfigService(ActiveQuadsSigRService) {
        var sigRHubslocal = [
        {
            hubName: 'ActiveQuadHub',
            connStartedAction: ActiveQuadsSigRService.hubReadyNotify
        }];

        Object.defineProperty(this, 'sigRHubs', {
            get: function () {
                return sigRHubslocal;
            }
            });
    }
})()