(function () {
    'use strict'

    var controllerId = 'settingsController';

    angular.module('app').controller(controllerId, ['localDataStoreService', 'ActiveQuadsSigRService', settingsControllerFct]);

    function settingsControllerFct(localDataStoreService, ActiveQuadsSigRService) {
        var vm = this;

        vm.selected;
        vm.selectedQuad;
        vm.quads = localDataStoreService.activeQuads;
        vm.selectedQuadDetails = {
            id: null,
            platformConfig: null,
            telemetryFeeds: null
        }

        vm.setSelected = function () {
            vm.selectedQuadDetails.id = vm.selectedQuad.QuadId;
            vm.selectedQuadDetails.platformConfig = 2;
            vm.selectedQuadDetails.telemetryFeeds = 1;
        }

        vm.check = function (selected, quads) {
            return quads[0];
        }

        vm.submit = function () {
            // Try and take controll of the chosen active quad.
            ActiveQuadsSigRService.tryTakeQuad(vm.selectedQuad).then(function (resultofTake) {
                if (resultofTake) {

                }
                else {
                    //Display warning and ask user to try and select another quad from the updated list.

                }
            });
        }
    }
})()