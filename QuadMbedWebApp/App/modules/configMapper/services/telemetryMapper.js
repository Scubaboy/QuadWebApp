(function () {
    'use strict';

    var serviceId = 'telemetryMapper';

    angular.module('ConfigurationMapper').service(serviceId, ['enumFct', telemetryMapperFct]);

    function telemetryMapperFct(enumFct) {
        var that = this;
        var telemetryEnums = new enumFct.Enum();

        telemetryEnums.Enums('Xbee', 'GSMDongle');

        var telemetryMap = [];

        telemetryMap[telemetryEnums.Xbee] = {
            type: telemetryEnums.Xbee,
            name: 'XBee',
            group: 'comms'
        };
        telemetryMap[telemetryEnums.GSMDongle] = {
            type: telemetryEnums.GSMDongle,
            name: 'GSMDongle',
            group: 'comms'
        }

        this.rawTelemetryOptionsToUI = function (rawTelemetryOptions) {
            var telemetryUi = [];

            for (var iter = 0; iter <= rawTelemetryOptions; iter++) {
                telemetryUi[iter] = telemetryMap[iter];
            }

            return telemetryUi;
        }
    }
})()