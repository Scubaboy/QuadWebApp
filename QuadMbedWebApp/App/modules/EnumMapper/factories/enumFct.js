(function () {
    'use strict';

    var factoryId = 'enumFct';

    angular.module('enumMapper').factory(factoryId, [factoryFct]);

    function factoryFct() {
        var services = {
            Enum: Enum
        }

        function Enum(){
            Object.defineProperty(this, 'Enums', {
                value: function () {
                    for (var i in arguments) {
                        Object.defineProperty(this, arguments[i], {
                            value: parseInt(i),
                            writeable: false,
                            enumerable: true,
                            configurable: false
                        });
                    }
                    return this;
                },
                writeable: false,
                enumerbale: false,
                configurable: false
            })
        }

        return services;
    }
})()