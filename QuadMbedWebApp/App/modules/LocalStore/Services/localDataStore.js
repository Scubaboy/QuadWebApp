(function () {
    'use strict';

    var serviceId = 'localDataStoreService';

    angular.module('localStore').service(serviceId, [localDataStoreServiceFct]);

    function localDataStoreServiceFct() {
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
                localStore.activeQuads = newData;
            }
        });

        Object.defineProperty(this, 'selectedQuad', {
            get: function () {
                return localStore.selectedQuad;
            },

            set: function (newSelectedQuad) {
                localStore.selectedQuad = newSelectedQuad;
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
})()