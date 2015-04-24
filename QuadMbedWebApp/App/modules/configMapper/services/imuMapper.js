(function () {
    'use strict';

    var serviceId = 'imuMapper';

    angular.module('ConfigurationMapper').service(serviceId, ['enumFct', imuMapperFct]);

    function imuMapperFct(enumFct) {
        var that = this;
        var imuEnums = new enumFct.Enum();

        imuEnums.Enums('DCM', 'MPU9150');

        var imuMap = [];

        imuMap[imuEnums.DCM] = {
            type: imuEnums.DCM,
            name: 'DCM',
            group: 'imu'
        };

        imuMap[imuEnums.MPU9150] = {
            type: imuEnums.MPU9150,
            name: 'MPU9150',
            group: 'imu'
        };

        this.rawImuOptionsToUI = function (rawImuOptions) {
            var imuUi = [];

            for (var iter = 0; iter <= rawImuOptions; iter++) {
                imuUi[iter] = imuMap[iter];
            }

            return imuUi;
        }
    }
})()