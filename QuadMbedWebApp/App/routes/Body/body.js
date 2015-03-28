(function () {
    'use strict'

    var controllerId = 'bodyCtrl';

    angular.module('app').controller(controllerId, ['viewService', bodyCtrl]);

    function bodyCtrl(viewService) {
        var vm = this;

        function viewChange() {
            vm.route = viewService.activeMenuView;
        }
        
        viewService.onViewChange = viewChange;

        vm.subMenu = function () {
            return viewService.toolBarMenus;
        }

        vm.showSubMenuBar = function () {
            if (viewService.toolBarMenus == undefined) {
                return false;
            }
            return viewService.toolBarMenus.length > 0;
        };

        vm.subMenuClick = function (menu) {
            console.log("menu clicked")
            viewService.setActiveMenuView = menu;
        }

        
    };
})()