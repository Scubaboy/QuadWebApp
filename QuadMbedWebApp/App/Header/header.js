(function () {
    'use srrict'

    var controllerId = 'headerCtrl';

    angular.module('app').controller(controllerId, ['toolOptionsFct', headerCtrl]);

    function headerCtrl(toolOptionsFct) {
        var vm = this;

        vm.toolOptions = toolOptionsFct.tools();

        vm.click = function (item) {
            console.log("click"); 
        }
    };
})()