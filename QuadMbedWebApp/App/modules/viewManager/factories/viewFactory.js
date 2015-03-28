(function () {
    'use strict';

    var factoryId = 'viewFactory';

    angular.module('viewManager').factory(factoryId, [viewFactoryFct]);

    function viewFactoryFct() {
        var factory = {
            viewBuilder: viewBuilder
        };
        
        function viewBuilder() {
            var that = this;

            var toolBarMenus = [];
            var toolBarMenuViews = [];

            var toolBar = [
                {
                    name: "Settings",
                    image: "../../../../../Content/images/Setting-Icon.png",
                    route: '/sysSettings'
                },
                {
                    name: "Kpi",
                    image: "../../../../../Content/images/Data Icon.png",
                    route: '/sysKPIS'
                }
            ];

            toolBarMenus['Settings'] = [
                {
                    title: 'Select Sys Config',
                    menuViewId: 1,
                    isActive: true
                },
                {
                     title: 'Run Config',
                     isActive: false,
                },
                {
                     title: 'Save/Load Config',
                     isActive: false,
                },
                {
                     title: 'Tune PIDs',
                     isActive: false,
                }
            ];

            toolBarMenuViews[1] = {
                view: '/app/modules/viewManager/views/Settings/settings.html',
                controller: 'settingsController as vm'
            };


            var userSettings = [
                {
                    name: "userSettings",
                    image: "../../../../../content/images/emptyProfile.png"
                }
            ];

            var quadControl = [
                    {
                        name: "quadFlightCtrl",
                        image: "../../../../../content/images/QuadTool.png"
                    }
            ];

            Object.defineProperty(this, 'toolBar', {
                get: function () {
                    return toolBar;
                }
            });

            Object.defineProperty(this, 'toolBarMenus', {
                get: function () {
                    return toolBarMenus;
                }
            });

            Object.defineProperty(this, 'toolBarMenuViews', {
                get: function () {
                    return toolBarMenuViews;
                }
            });

            Object.defineProperty(this, 'userSettings', {
                get: function () {
                    return userSettings;
                }
            });

            Object.defineProperty(this, 'quadControl', {
                get: function () {
                    return quadControl;
                }
            });

        };

        return factory;
    };
})()