(function () {
    'use strict'

    var controllerId = 'settingsController';

    angular.module('app').controller(controllerId, ['localDataStoreService', 'ActiveQuadsSigRService', 'viewService', settingsControllerFct]);

    function settingsControllerFct(localDataStoreService, ActiveQuadsSigRService, viewService) {
        var vm = this;

        vm.selected;
        vm.selectedQuad;
        vm.quads = localDataStoreService.activeQuads;
        vm.selectedQuadDetails = {
            id: null,
            gpsOptions: null,
            telemetryOptions: null,
            imuOptions: null,
            altimeterOptions: null
        }

        vm.setSelected = function () {
            vm.selectedQuadDetails.quadId = vm.selectedQuad.id;
            vm.selectedQuadDetails.gpsOptions = vm.selectedQuad.gpsOptionsDisplayString;;
            vm.selectedQuadDetails.telemetryOptions = vm.selectedQuad.telemetryOptionsDisplayString;
            vm.selectedQuadDetails.imuOptions = vm.selectedQuad.imuOptionsDisplayString;
            vm.selectedQuadDetails.altimeterOptions = vm.selectedQuad.altimeterOptionsDisplayString;
        }

        vm.check = function (selected, quads) {
            return quads[0];
        }

        vm.submit = function () {
            // Try and take controll of the chosen active quad.
            ActiveQuadsSigRService.tryTakeQuad(vm.selectedQuad.id).then(function (resultofTake) {
                if (resultofTake) {
                    localDataStoreService.selectedQuad = vm.selectedQuad;
                    viewService.ClearActiveView();
                }
                else {
                    //Display warning and ask user to try and select another quad from the updated list.

                }
            });
        }
    }
})()