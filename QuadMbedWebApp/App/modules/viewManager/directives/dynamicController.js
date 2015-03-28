(function () {
    'use strict';

    var directiveId = 'dynamicController'

    angular.module('viewManager').directive(directiveId, ['$compile', dynamicControllerFct]);

    //need to isolate the scope.

    function dynamicControllerFct($compile) {
        var directive = {
            link: linkFct
        }

        function linkFct(scope, element, attrs) {
            // update for quad code.
            for (var i = 0; i < panels.length; i++) {
                var template = '<section><div ng-include="path/to/file.html" ng-controller="' + panels[i] + '"></div></section>';
                var cTemplate = compile(template)(scope);

                element.append(cTemplate);
            }
        }

        return directive;
    }
})()