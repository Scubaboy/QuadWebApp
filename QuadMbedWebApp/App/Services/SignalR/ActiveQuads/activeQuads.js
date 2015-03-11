(function () {
    'use strict'

    var factoryId = 'ActiveQuadsSigRFct'

    angular.module('app').service(factoryId, ['$q', 'signalRHub', 'signalRHubProxy', activeQuadsSigRFct]);

    function activeQuadsSigRFct($q, signalRHub, signalRHubProxy) {

            var configProxy = null;
            var that = this;
            var hubActions = []; 

            function activeQuadsUpdated (data, defer) {
                console.log(data);
                defer.resolve(data);
            }

            this.initialise = function() {
                configProxy = new signalRHubProxy.hubProxy(signalRHub.getHubProxyEntity("ActiveQuadHub"), $q);

                hubActions.push({
                    actionname: 'UpdateActiveQuads',
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