(function () {
    'use strict'

    var factoryId = "toolOptionsFct";

    angular.module('app').factory(factoryId, [toolOptionsFct]);

    function toolOptionsFct() {

        function tools() {
            return [
                {
                    name: "Settings",
                    image: "../../Content/images/Settings-Icon-3.png"
                },
                {
                    name: "Kpi",
                    image: "../../Content/images/Settings-Icon-3.png"
                },
                {
                    name: "Kpi",
                    image: "../../Content/images/Settings-Icon-3.png"
                },
                {
                    name: "Kpi",
                    image: "../../Content/images/Settings-Icon-3.png"
                }
            ];
        };

        var services =
            {
                tools: tools
            };

        return services;
    }
})()