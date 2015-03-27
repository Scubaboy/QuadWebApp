(function () {
    'use strict'

    var serviceId = 'modalService';

    angular.module('app').service(serviceId, ['$modal', modalServiceFct]);

    function modalServiceFct($modal) {
        modalServiceFct.prototype.custom = function(atts) {
            return $modal.open({
                templateUrl: atts.templateUrl,
                controller: atts.controller,
                size: atts.size,
                backdrop: atts.backdrop,
                resolve: {
                    title: function () {
                        return atts.title;
                    }
                }
            }).result;
        }
    }
})()