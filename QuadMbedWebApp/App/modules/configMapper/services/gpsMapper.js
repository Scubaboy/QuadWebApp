(function () {
    'use strict';

    var serviceId = 'gpsMapper';

    angular.module('ConfigurationMapper').service(serviceId, ['enumFct',gpsMapperFct]);

    function gpsMapperFct(enumFct) {
        var that = this;
        var gpsEnums = new enumFct.Enum();

        gpsEnums.Enums('MTKV11');

        var gpsMap = [];

        gpsMap[gpsEnums.MTKV11] = {
            type: gpsEnums.MTKV11,
            name: 'MTKV11',
            xpos: '100px',
            ypos: '100px',
            group: 'gps'
        };

        this.rawGpsOptionsToUI = function (rawGpsOptions) {
            var gpsUi = [];

            for (var iter = 0; iter <= rawGpsOptions; iter++) {
                gpsUi[iter] = gpsMap[iter];
            }

            return gpsUi;
        }
    }
})()