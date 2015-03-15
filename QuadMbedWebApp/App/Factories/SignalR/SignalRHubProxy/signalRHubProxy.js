(function () {
    'use strict'

    var factoryId = 'signalRHubProxy'
    angular.module('app').factory(factoryId, [signalRHubProxy]);

    function signalRHubProxy() {
        function hubProxy(hubProxy, qDefer) {
            var hubProxyInternal = hubProxy;
            var hubActionQueue = [];
            var that = this;

            function createCallbackFunc(actionName, callback) {
                return function (data) {
                    if (hubActionQueue.length) {
                        var currentRequest = hubActionQueue.shift();
                        callback(data, currentRequest.defer);

                        if (hubActionQueue.length) {
                            var nextRequest = hubActionQueue.shift();
                            hubProxyInternal.proxy.invoke(nextRequest.hubActionName, nextRequest.parameters);
                        }
                    }
                };
            }

            this.setProxyHubActions = function(hubActions) {
                hubActions.forEach(function (hubAction) {
                    hubProxyInternal.proxy.on(hubAction.actionname, createCallbackFunc(hubAction.actionname, hubAction.callback)); //createCallbackFunc(hubAction.actionname, hubAction.callback)
                });
            }

            this.forceActionRequestCycle = function () {
                if (hubActionQueue.length) {
                    hubProxyInternal.proxy.invoke(hubActionQueue[0].hubActionName, hubActionQueue[0].parameters);
                }
            }

            this.callHubActionRequest = function (hubActionName, parameters) {
                var requestDefer = qDefer.defer();

                if (!hubProxyInternal.hubReady) {
                    hubActionQueue.push({
                        defer: requestDefer,
                        parameters: parameters,
                        hubActionName: hubActionName
                    });
                } else {
                    hubActionQueue.push({
                        defer: requestDefer,
                        parameters: parameters,
                        hubActionName: hubActionName
                    });
                    if (hubActionQueue.length === 1) {
                        if (parameters != undefined) {
                            hubProxyInternal.proxy.invoke(hubActionName, parameters);
                        } else {
                            hubProxyInternal.proxy.invoke(hubActionName);
                        }
                    }
                }

                return requestDefer.promise;
            }
        }

        return {
            hubProxy: hubProxy
        };
    }
})()