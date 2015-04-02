(function () {
    'use strict';

    var factoryId = 'viewFactory';

    angular.module('viewManager').factory(factoryId, ['localDataStoreService', viewFactoryFct]);

    function viewFactoryFct(localDataStoreService) {
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
                    title: 'Select Quad',
                    menuViewId: 1,
                    isActive: function () {
                        return localDataStoreService.activeQuads != null;
                    }
                },
                {
                    title: 'Configure Quad',
                    menuViewId: 2,
                    isActive: function () {
                        return localDataStoreService.selectedQuad != null;
                    }
                },
                {
                     title: 'Tune PIDs',
                     isActive: function () {
                         return false;
                     }
                }
            ];

            toolBarMenuViews[1] = {
                view: "'/app/modules/viewManager/views/Settings/Settings.html'",
                controller: 'settingsController as vm'
            };

            toolBarMenuViews[2] = {
                view: "'/app/modules/viewManager/views/configureQuad/configureQuad.html'",
                controller: 'configureQuadController as vm'
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