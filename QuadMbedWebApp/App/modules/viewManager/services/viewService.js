(function () {
    'use strict';

    var serviceId = 'viewService';

    angular.module('viewManager').service(serviceId, ['viewFactory', viewServiceFct]);

    function viewServiceFct(viewFactory) {
        var activeToolBarOption = undefined;
        var activeToolBarMenu = undefined;
        var activeView = undefined;
        var viewChange = undefined;
        var theViewCtrl = new viewFactory.viewBuilder();

        Object.defineProperty(this, 'toolBar', {
            get: function () {
                return theViewCtrl.toolBar;
            }
        });

        Object.defineProperty(this, 'quadControl', {
            get: function () {
                return theViewCtrl.quadControl;
            }
        })
        Object.defineProperty(this, 'userSettings', {
            get: function () {
                return theViewCtrl.userSettings;
            }
        });

        Object.defineProperty(this, 'activeToolBarOption', {
            set: function (toolBarOption) {
                activeToolBarOption = toolBarOption;
            }
        });

       
        Object.defineProperty(this, 'toolBarMenus', {
            get: function () {
                if (activeToolBarOption != undefined) {
                    return theViewCtrl.toolBarMenus[activeToolBarOption.name];
                }
                else {
                    return undefined;
                }
            }
        });

        Object.defineProperty(this, 'setActiveToolBarMenu', {
            set: function (newActiveToolBarMenu) {
                activeToolBarMenu = newActiveToolBarMenu;
            }
        });

        Object.defineProperty(this, 'onViewChange', {
            set: function (newOnViewChange) {
                viewChange = newOnViewChange;
            }
        });

        Object.defineProperty(this, 'setActiveMenuView', {
            set: function (newActiveMenuView) {
                activeView = theViewCtrl.toolBarMenuViews[newActiveMenuView.menuViewId];
                if (viewChange != undefined) {
                    viewChange();
                }
               
            }
        });

        Object.defineProperty(this, 'activeMenuView', {
            get: function () {
                console.log("checking for view.")
                if (activeView != undefined) {
                    console.log('got a menu view');
                    return activeView.view;
                }
                else {
                    return undefined;
                }
            }
        });

        Object.defineProperty(this, 'activeMenuViewController', {
            get: function () {
                
                if (activeView != undefined) {
                    return activeView.controller;
                }
                else {
                    return undefined;
                }
            }
        });
        this.ClearActiveView = function () {
            activeView = undefined;

            if (viewChange != undefined) {
                viewChange();
            }
        };
    }
})()