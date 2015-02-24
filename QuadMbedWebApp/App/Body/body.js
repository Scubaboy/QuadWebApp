(function () {
    'use strict'

    var controllerId = 'bodyCtrl';

    angular.module('app').controller(controllerId, ['windowManager', bodyCtrl]);

    function bodyCtrl(windowManager) {
        var vm = this;

        vm.windows = windowManager.getWindows();

        vm.gotActiveWindows = function () {
            return windowManager.getWindows().length > 0;
        };
    };
})()