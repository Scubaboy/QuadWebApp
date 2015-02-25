(function () {
    'use strict'

    var factoryId = "toolFct";

    angular.module('app').factory(factoryId, ['windowManager','menuServiceId', toolFct]);

    function toolFct(windowManager, menuServiceId) {
        RegisterSubMenus()

        function RegisterSubMenus()
        {
            menuServiceId.registerSubMenu([{
                title: 'Select Sys Config',
                isActive: true,
                selectAction: function (){
                    windowManager.addSettingsWindow();
                },
            },
            {
                title: 'Run Config',
                isActive: false,
                selectAction: function () {
                    windowManager.addRunConfigWindow();
                }
            },
            {
                title: 'Save/Load Config',
                isActive: false,
                selectAction: function () {
                    windowManager.addLoadConfigWindow();
                }
            },
            {
                title: 'Tune PIDs',
                isActive: false,
                selectAction: function () {
                    windowManager.addTunePIDsWindow();
                }
            }
            ], 'settingsSubMenu');
        }

        function tools() {
            return [
                {
                    name: "Settings",
                    image: "../../Content/images/Setting-Icon.png",
                    subMenuId: 'settingsSubMenu'
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
            menuServiceId.setSubMenu(item.subMenuId)
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