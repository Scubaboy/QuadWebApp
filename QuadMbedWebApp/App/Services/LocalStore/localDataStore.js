(function () {
    'use strict';

    var serviceId = 'localDataStoreService';

    angular.module('app').service(serviceId, [localDataStoreServiceFct]);

    function localDataStoreServiceFct() {
        var localStore = null;

        setUpStoreStructure();
        function setUpStoreStructure() {
            localStore = {
                activeQuads: null,
                selectedQuad: null,
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
        })
    };
})()