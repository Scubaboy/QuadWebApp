(function () {
    'use strict'

    var factoryId = 'signalRHubProxy'
    angular.module('app').factory(factoryId,  ['SignalRResponceTypesConstant', signalRHubProxy]);

    function signalRHubProxy(SignalRResponceTypesConstant) {
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
                    switch (hubAction.type) {
                        case SignalRResponceTypesConstant.responceTypes.serverBroadcastUpdate:
                            hubProxyInternal.proxy.on(hubAction.actionname, hubAction.callback);
                            break;
                    }
                });
            }

            this.forceActionRequestCycle = function () {
                if (hubActionQueue.length) {
                    hubProxyInternal.proxy.invoke(hubActionQueue[0].hubActionName, hubActionQueue[0].parameters);
                }
            }

            this.callHubActionRequest = function (hubActionName, parameters) {
                var requestDefer = qDefer.defer();

                if (parameters != undefined) {
                    hubProxyInternal.proxy.invoke(hubActionName, parameters).done(function (result) {
                        requestDefer.resolve(result);
                    }).fail(function (error) {
                        requestDefer.reject(error);
                    });
                } else {
                    hubProxyInternal.proxy.invoke(hubActionName).done(function () {
                        requestDefer.resolve();
                    }).fail(function (error) {
                        requestDefer.reject(error);
                    });
                }

                return requestDefer.promise;
            }
        }

        return {
            hubProxy: hubProxy
        };
    }
})()