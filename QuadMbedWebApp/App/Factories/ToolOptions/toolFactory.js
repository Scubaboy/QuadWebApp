(function () {
    'use strict'

    var factoryId = "toolFct";

    angular.module('app').factory(factoryId, ['modalService', 'menuServiceId', '$location', toolFct]);

    function toolFct(modalService, menuServiceId, $location) {
        RegisterSubMenus()

        function RegisterSubMenus()
        {
            menuServiceId.registerSubMenu([{
                title: 'Select Sys Config',
                isActive: true,
                template: '/app/Windows/Settings/settings.html',
                selectAction: function (){
                    modalService.custom({
                        templateUrl: '/app/Windows/Settings/settings.html',
                        controller: 'settingsController as vm',
                        size: null,
                        backdrop: 'static',
                        title: "System Settings",
                    });
                },
            },
            {
                title: 'Run Config',
                isActive: false,
                selectAction: function () {
                    //windowManager.addRunConfigWindow();
                }
            },
            {
                title: 'Save/Load Config',
                isActive: false,
                selectAction: function () {
                   // windowManager.addLoadConfigWindow();
                }
            },
            {
                title: 'Tune PIDs',
                isActive: false,
                selectAction: function () {
                   // windowManager.addTunePIDsWindow();
                }
            }
            ], 'settingsSubMenu');
        }

        function tools() {
            return [
                {
                    name: "Settings",
                    image: "../../Content/images/Setting-Icon.png",
                    subMenuId: 'settingsSubMenu',
                    route:'/sysSettings'
                },
                {
                    name: "Kpi",
                    image: "../../Content/images/Data Icon.png",
                    route: '/sysKPIS'
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

        var factory =
            {
                tools: tools,
                userSettings: userSettings,
                quadControl: quadControl,
                clickAction: clickAction
            };

        return factory;
    }
})()