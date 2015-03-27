(function () {
    'use strict'

    var serviceId = 'ActiveQuadsSigRService'

    angular.module('app').service(serviceId, ['$q', 'signalRHub', 'signalRHubProxy', 'SignalRResponceTypesConstant', 'localDataStoreService', activeQuadsSigRService]);

    function activeQuadsSigRService($q, signalRHub, signalRHubProxy, SignalRResponceTypesConstant, localDataStoreService) {

            var configProxy = null;
            var that = this;
            var hubActions = []; 

            function activeQuadsUpdated (data) {
                console.log(data);
                localDataStoreService.activeQuads = data;
            }

            this.initialise = function() {
                configProxy = new signalRHubProxy.hubProxy(signalRHub.getHubProxyEntity("ActiveQuadHub"), $q);

            

                hubActions.push({
                    actionname: 'UpdateActiveQuads',
                    type: SignalRResponceTypesConstant.responceTypes.serverBroadcastUpdate,
                    callback: activeQuadsUpdated,
                });

                configProxy.setProxyHubActions(hubActions);
            }

            this.hubReadyNotify = function() {
                configProxy.forceActionRequestCycle();
            }

            this.getActiveQuads = function() {
                return configProxy.callHubActionRequest('GetActiveQuads');
            }

            this.tryTakeQuad = function(quad) {
                return configProxy.callHubActionRequest('TryTakeQuad', quad);
            }
        };
})()