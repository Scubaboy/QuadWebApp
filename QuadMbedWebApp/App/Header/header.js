(function () {
    'use srrict'

    var controllerId = 'headerCtrl';

    angular.module('app').controller(controllerId, ['toolFct', headerCtrl]);

    function headerCtrl(toolFct) {
        var vm = this;

        vm.toolOptions = toolFct.tools();
        vm.userSettings = toolFct.userSettings();
        vm.quadControl = toolFct.quadControl();

        vm.click = function (item) {
            toolFct.clickAction(item);
        }
    };
})()