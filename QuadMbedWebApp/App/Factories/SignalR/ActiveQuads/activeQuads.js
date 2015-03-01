(function () {
    'use strict'

    var factoryId = 'ActiveQuadsSigRFct'

    angular.module('app').factory(factoryId, ['$q', 'signalRHub', activeQuadsSigRFct]);

    function activeQuadsSigRFct($q, signalRHub) {

        function activeQuadsSigR() {

            var configProxy = null;
            var that = this;

            activeQuadsSigR.prototype.activeQuadsUpdated = function (data, defer) {
                console.log(data);
                defer.resolve(data);
            }

            this.initialise = function() {
                configProxy = new ProxyConfig(signalRHub.getHubProxyEntity("UsrManConfigHub"), $q);

                hubActions.push({
                    actionname: 'ConfigAdmins',
                    callback: configAdminsCallback
                });

                hubActions.push({
                    actionname: 'UsrActManOpts',
                    callback: getUserActManOptCallback
                });

                hubActions.push({
                    actionname: 'UpdateActionResult',
                    callback: updateActionResult,
                });

                configProxy.setProxyHubActions(hubActions);
            }

            function hubReadyNotify() {
                configProxy.forceActionRequestCycle();
            }

            function getConfAdmin(username) {
                return configProxy.callHubActionRequest('GetConfigAdmins', username);
            }

            function getUsrActManOpt() {
                return configProxy.callHubActionRequest('GetUserAccountManagementOptions');
            }

            function setInitialConfig(initialconfig) {
                return configProxy.callHubActionRequest('SetInitialConfiguration', initialconfig);
            }
        };

        return {
            activeQuadsSigR : activeQuadsSigR
        }
    };
})()