(function () {
    'use strict'

    var controllerId = 'bodyCtrl';

    angular.module('app').controller(controllerId, ['windowManager', 'menuServiceId', bodyCtrl]);

    function bodyCtrl(windowManager, menuServiceId) {
        var vm = this;

        vm.windows = windowManager.getWindows();
        vm.subMenu = function () {
            return menuServiceId.getSubMenu();
        }

        vm.showSubMenuBar = function () {
            if (menuServiceId.getSubMenu() == undefined) {
                return false;
            }
            return menuServiceId.getSubMenu().length > 0;
        };
    };
})()