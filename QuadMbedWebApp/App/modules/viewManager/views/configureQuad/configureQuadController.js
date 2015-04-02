(function () {
    'use strict';

    var controllerId = 'configureQuadController';

    angular.module('viewManager').controller(controllerId, [configureQuadControllerFct]);

    function configureQuadControllerFct() {
        var vm = this;

        vm.newConfigSelected = false;
        vm.restoreSelected = false;

        vm.restoreClick = function () {
            vm.restoreSelected = true;
            vm.newConfigSelected = false;
        }

        vm.newClick = function () {
            vm.restoreSelected = false;
            vm.newConfigSelected = true;
        }
    }
})()