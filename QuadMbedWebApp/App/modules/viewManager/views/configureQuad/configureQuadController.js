(function () {
    'use strict';

    var controllerId = 'configureQuadController';

    angular.module('viewManager').controller(controllerId, ['sourceConfigMgr', 'localDataStoreService', configureQuadControllerFct]);

    function configureQuadControllerFct(sourceConfigMgr, localDataStoreService) {
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

        console.log(sourceConfigMgr.configOptions.length)
        vm.configOptions = sourceConfigMgr.configOptions;
        vm.selectedConfigOptions = localDataStoreService.selectedQuad.selectedConfig;

        vm.takeFromSource = function (id) {
            var values = id.split(',');

            if (values !== undefined && values.length === 2) {
                var searchObj = {
                    key: values[1],
                    item: values[0]
                }

                sourceConfigMgr.takeSourceConfigItem(searchObj);
            }
        }

        vm.returnToSource = function (id) {
            var values = id.split(',');

            if (values !== undefined && values.length === 2) {
                var searchObj = {
                    key: values[1],
                    item: values[0]
                }

                sourceConfigMgr.returnConfigItemToSource(searchObj);
            }
        }
    }
})()