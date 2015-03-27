(function () {
    'use strict';

    var constantId = 'SignalRResponceTypesConstant';

    angular.module('app').constant (constantId, {
        responceTypes: {
            serverBroadcastUpdate: 0,
            serverRequestResponse: 1
        }
        
    });

})()