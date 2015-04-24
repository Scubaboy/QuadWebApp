(function () {
    'use strict';

    var serviceId = 'localDataStoreService';

    angular.module('localStore').service(serviceId, ['telemetryMapper', 'gpsMapper', 'altimeterMapper', 'imuMapper', 'sourceConfigMgr', localDataStoreServiceFct]);

    function localDataStoreServiceFct(telemetryMapper, gpsMapper, altimeterMapper, imuMapper, sourceConfigMgr) {
        var localStore = null;

        setUpStoreStructure();
        function setUpStoreStructure() {
            localStore = {
                activeQuads: null,
                selectedQuad: null,
                selectedConfig: null
            };
        };

        Object.defineProperty(this, 'activeQuads', {
            get: function () {
                return localStore.activeQuads;
            },
            set: function (newData) {
                localStore.activeQuads = [];
                for (var quad = 0; quad < newData.length; quad++) {
                    localStore.activeQuads.push(new activeQuad(
                        telemetryMapper.rawTelemetryOptionsToUI(newData[quad].SupportedComms),
                        imuMapper.rawImuOptionsToUI(newData[quad].SupportedIMU),
                        gpsMapper.rawGpsOptionsToUI(newData[quad].SupportGPS),
                        altimeterMapper.rawAltOptionsToUI(newData[quad].SupportedAlt),
                        newData[quad].QuadId));
                }
            }
        });

        Object.defineProperty(this, 'selectedQuad', {
            get: function () {
                return localStore.selectedQuad;
            },

            set: function (newSelectedQuad) {
                localStore.selectedQuad = newSelectedQuad;
                sourceConfigMgr.selectedQuad(newSelectedQuad)
            }
        });

        Object.defineProperty(this, 'selectedConfig', {
            get: function () {
                return localStore.selectedConfig;
            },

            set: function (newSelectedConfig) {
                localStore.selectedConfig = newSelectedConfig;
            }
        });
    };

    function activeQuad(inputTelemetryOptions, inputImuOptions, inputGpsOptions, inputAltimeterOptions, inputId) {
        var telemetryOptions = inputTelemetryOptions;
        var imuOptions = inputImuOptions;
        var gpsOptions = inputGpsOptions;
        var atlimeterOptions = inputAltimeterOptions;
        var id = inputId;
        var chosenConfig = []

        this.addConfigItem = function (configItem) {
            chosenConfig.push(configItem);
        }

        this.removeConfigItem = function (configItem) {
            var index = chosenConfig.indexOf(configItem);

            if (index > -1) {
                chosenConfig.splice(index, 1);
            }
        }

        Object.defineProperty(this, 'selectedConfig', {
            get: function () {
                return chosenConfig;
            }
        })

        Object.defineProperty(this, 'telemetryOptionsDisplayString', {
            get: function () {
                var str = [];
                telemetryOptions.forEach(function (data) {
                    str.push(data.name);
                })
                return str.join(', ');
            }
        });

        Object.defineProperty(this, 'gpsOptionsDisplayString', {
            get: function () {
                var str = [];
                gpsOptions.forEach(function(data){
                    str.push(data.name);
                })

                return str.join(', ');
            }
        });

        Object.defineProperty(this, 'imuOptionsDisplayString', {
            get: function () {
                var str = [];
                imuOptions.forEach(function (data) {
                    str.push(data.name);
                })

                return str.join(', ');
            }
        });

        Object.defineProperty(this, 'altimeterOptionsDisplayString', {
            get: function () {
                var str = [];
                atlimeterOptions.forEach(function (data) {
                    str.push(data.name);
                })

                return str.join(', ');
            }
        });

        Object.defineProperty(this, 'telemetryOptions', {
            get: function () {
                return telemetryOptions;
            }
        })

        Object.defineProperty(this, 'imuOptions', {
            get: function () {
                return imuOptions;
            }
        })

        Object.defineProperty(this, 'gpsOptions', {
            get: function () {
                return gpsOptions;
            }
        })

        Object.defineProperty(this, 'altimeterOptions', {
            get: function () {
                return atlimeterOptions;
            }
        })

        Object.defineProperty(this, 'id', {
            get: function () {
                return id;
            }
        })

    }
})()