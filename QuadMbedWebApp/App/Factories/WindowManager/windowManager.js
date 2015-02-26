(function () {
    'use strict';

    var serviceId = 'windowManager';

    angular.module('app').factory(serviceId, [windowManager]);

    function windowManager() {
        // Define the functions and properties to reveal.
        var service = {
            getWindows: getWindows,
            addWindow: addWindow,
            getWindowById: getWindowById,
            deleteWindowById: deleteWindowById,
            bringWindowToFront: bringWindowToFront,
            addUIWindow: addUIWindow,
            getWindowByElementId: getWindowByElementId
        };

        var windows = [];

        var xpos = 10;
        var ypos = 100;
        var width = 500;
        var height = 300;
        var windowId = 0;
        var largestZ = 0;

        // set up a 4 by 4 grid that windows can be positioned in
        // when referencing a grid slot the first number will be the horizontal
        // and the second the vertical
        // i.e grid[1][2] would be the 2nd column and the 3rd row
        var grid = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]];


        function getWindows() {
            return windows;
        }

        function addWindow() {
            xpos += 30;
            ypos += 30;
            windowId++;
            largestZ++;

            var window = {
                id: windowId,
                x: xpos,
                y: ypos,
                width: width,
                height: height,
                maximised: false,
                zIndex: largestZ,
                docked: false,
                showHeader: false,
                row: 0,
                column: 0,
                rowSpan: 1,
                colSpan: 1,
                minWidth: 0,
                minHeight: 0,
                elementId: windowId,
                args: null
            };

            return window;
        }

        function addUIWindow(windowAtts) {
            var myWindow = addWindow();

            myWindow.name = windowAtts.name; //"Settings";
            myWindow.route = windowAtts.route;//'/app/Windows/Settings/settings.html';
            myWindow.minWidth = windowAtts.width;//400;
            myWindow.minHeight = windowAtts.height;//200;
            myWindow.showHeader = windowAtts.showHeader;//true;
            windows.push(myWindow);
        }

        function getWindowByElementId(elementId) {

            for (var i = 0; i < windows.length; i++) {
                if (windows[i].elementId == elementId) {
                    return windows[i];
                }
            }

            return null;
        }

        function getWindowById(id) {
            var index = getIndexOfId(id);
            if (index != -1) {
                return windows[index];
            }

            return null;
        }

        function bringWindowToFront(id) {
            largestZ++;
            for (var i = 0; i < windows.length; i++) {
                if (windows[i].id == id) {
                    windows[i].zIndex = largestZ;
                }
            }
        }

        function getIndexOfId(id) {
            for (var i = 0; i < windows.length; i++) {
                if (windows[i].id == id) {
                    return i;
                }
            }

            return -1;
        }

        function deleteWindowById(id, closingNotification) {
            var indexToDelete = getIndexOfId(id);

            if (indexToDelete != -1) {
                windows.splice(indexToDelete, 1);
            }
        }

        return service;
    }
})();