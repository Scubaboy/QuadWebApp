(function () {
    'use strict';

    var serviceId = "signalRHub";

    angular.module('app').service(serviceId, ['$', SignalRHub]);

    function SignalRHub($) {

            var connection = null;
            var hubReady = false;
            var hubProxys = [];
            var that = this;

            this.isHubReady = function() {
                return hubReady;
            }

            this.initialise = function(hubs) {
                //Getting the connection object
                connection = $.hubConnection();

                //Creating proxys
                hubs.forEach(function (item) {
                    hubProxys.push({
                        proxy: connection.createHubProxy(item.hubName),
                        proxyName: item.hubName,
                        connStartedAction: item.connStartedAction,
                        hubReady: false
                    });
                });
            }

            this.start = function() {
                connection.start().then(function () {
                    hubReady = true;

                    //Update hubproxy array with hub ready flags
                    hubProxys.forEach(function (item) {
                        item.hubReady = true;
                        item.connStartedAction();
                    });
                    console.log("signalr service started.");
                });
            }

            this.getHubProxyEntity = function(hubName) {
                var hubSearch = $.grep(hubProxys, function (hubItem) {
                    return hubItem.proxyName === hubName;
                });

                if (hubSearch.length == 1) {
                    return hubSearch[0];
                } else {
                    return undefined;
                }
            }
    }
})()