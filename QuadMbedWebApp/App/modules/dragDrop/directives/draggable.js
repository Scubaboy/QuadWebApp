(function () {
    'use strict';

    var directiveId = 'draggable';

    angular.module('dragDrop').directive(directiveId, [draggableFct]);

    function draggableFct() {
        return function (scope, element) {
            // this gives us the native JS object
            var el = element[0];

            el.draggable = true;

            el.addEventListener(
              'dragstart',
              function (e) {
                  e.dataTransfer.effectAllowed = 'move';
                  e.dataTransfer.setData('Text', "jj"); // will be an object att this.id
                  this.classList.add('drag');
                  return false;
              },
              false
            );

            el.addEventListener(
              'dragend',
              function (e) {
                  this.classList.remove('drag');
                  return false;
              },
              false
            );
        }
    }
})();