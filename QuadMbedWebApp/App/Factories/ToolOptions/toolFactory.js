(function () {
    'use strict'

    var factoryId = "toolFct";

    angular.module('app').factory(factoryId, ['windowManager', toolFct]);

    function toolFct(windowManager) {

        function tools() {
            return [
                {
                    name: "Settings",
                    image: "../../Content/images/Setting-Icon.png"
                },
                {
                    name: "Kpi",
                    image: "../../Content/images/Data Icon.png"
                }
            ];
        };

        function userSettings() {
            return [
                {
                    name: "userSettings",
                    image: "../../content/images/emptyProfile.png"
                }
            ]
        };

        function quadControl() {
            return [
                {
                    name: "quadFlightCtrl",
                    image: "../../content/images/QuadTool.png"
                }
            ]
        }

        function clickAction(item){
            console.log(item.name);
            windowManager.addSettingsWindow();
        };

        var services =
            {
                tools: tools,
                userSettings: userSettings,
                quadControl: quadControl,
                clickAction: clickAction
            };

        return services;
    }
})()