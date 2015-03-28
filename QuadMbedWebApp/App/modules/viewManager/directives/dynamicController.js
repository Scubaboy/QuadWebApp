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

        }

        return directive;
    }
})()