(function () {
    'use strict'

    var serviceId = "menuServiceId";

    angular.module('app').service(serviceId, [menuService]);

    function menuService() {

        var subMenus = [];
        var activeMenu = undefined;

        this.registerSubMenu = function registerSubMenu(menuItem, menuItemId) {
            subMenus[menuItemId] = menuItem;
        }

        this.getSubMenu = function getSubMenu() {
            return activeMenu;
        };

        this.enableDisbaleMenuItem = function (menuItemTitle, enableDisbale){
            var found = false;
            var menuItemIter = 0;
            var menuItem

            if (activeMenu != undefined) {
                while (menuItemIter < activeMenu.length && !found) {
                    if (activeMenu[menuIter].title === menuItemTitle) {
                        found = true;
                        menuItem = activeMenu[menuItemIter];
                    }
                }

                menuitem.isActive = enableDisbale;
            }
        }

        this.setSubMenu=  function setSubMenu(menuItemId) {
            activeMenu = subMenus[menuItemId];
        }

    };
})()