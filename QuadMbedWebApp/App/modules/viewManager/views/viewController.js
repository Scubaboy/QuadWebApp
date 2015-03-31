(function () {
    'use strict'

    var controllerId = 'viewController';

    angular.module('viewManager').controller(controllerId, ['viewService', viewControllerFct]);

    function viewControllerFct(viewService) {
        var vm = this;

        vm.assignedController = viewService.activeMenuViewController;
        vm.templatePath = viewService.activeViewTemplate;
    }
})()