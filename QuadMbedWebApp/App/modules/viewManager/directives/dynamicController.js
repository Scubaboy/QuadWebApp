(function () {
    'use strict';

    var directiveId = 'dynamicController'

    angular.module('viewManager').directive(directiveId, ['$compile', dynamicControllerFct]);

    function dynamicControllerFct($compile) {
        var directive = {
            restrict: 'E',
            link: linkFct
        }

        function linkFct(scope, element, attrs) {
            var template = '<div ng-include="' + scope.viewVm.templatePath + '" ng-controller="' + scope.viewVm.assignedController + '"></div>';
                var cTemplate = $compile(template)(scope);
                element.append(cTemplate);
        }

        return directive;
    }
})()