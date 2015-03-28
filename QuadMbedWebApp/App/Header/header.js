(function () {
    'use srrict'

    var controllerId = 'headerCtrl';

    angular.module('app').controller(controllerId, ['viewService', headerCtrl]);

    function headerCtrl(viewService) {
        var vm = this;

        vm.toolOptions = viewService.toolBar;
        vm.userSettings = viewService.userSettings;
        vm.quadControl = viewService.quadControl;

        vm.toolBarClick = function (toolBarItem) {
            viewService.activeToolBarOption = toolBarItem;
        }

        vm.click = function (item) {
            toolFct.clickAction(item);
        }
    };
})()