(function () {
    'use strict'

    var serviceId = 'altimeterMapper';

    angular.module('ConfigurationMapper').service(serviceId, ['enumFct', altimeterMapperFct]);

    function altimeterMapperFct(enumFct) {
        var that = this;
        var altimeterEnums = new enumFct.Enum();

        altimeterEnums.Enums('GPSAlt', 'MPL115A2');

        var altimeterMap = [];

        altimeterMap[altimeterEnums.GPSAlt] = {
            type: altimeterEnums.GPSAlt,
            name: 'GPSAlt',
            group: 'alt'
        };

        altimeterMap[altimeterEnums.MPL115A2] = {
            type: altimeterEnums.MPL115A2,
            name: 'MPL115A2',
            group: 'alt'
        };


        this.rawAltOptionsToUI = function (rawAltimeterOptions) {
            var altimeterUi = [];

            for (var iter = 0; iter <= rawAltimeterOptions; iter++) {
                altimeterUi[iter] = altimeterMap[iter];
            }

            return altimeterUi;
        }
    }
})()