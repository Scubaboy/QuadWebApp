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
            addGanttWindow: addGanttWindow,
            addKpiWindow: addKpiWindow,
            addKpiChartWindow: addKpiChartWindow,
            addKpiGoalsWindow: addKpiGoalsWindow,
            addSettingsWindow: addSettingsWindow,
            getWindowByElementId: getWindowByElementId
        };

        var windows = [];

        var xpos = 10;
        var ypos = 10;
        var width = 500;
        var height = 250;
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

        function addGanttWindow(windowWidth, windowHeight) {
            var myWindow = addWindow();

            myWindow.name = "Gantt Chart";
            myWindow.route = '/app/gantt/gantt.html';
            myWindow.elementId = "gantt-chart";
            myWindow.closingNotification = "ClosingGanttChart";
            myWindow.x = 0;
            myWindow.y = 0;
            myWindow.width = windowWidth || 1200;
            myWindow.height = windowHeight || 600;
            windows.push(myWindow);


            addKeyWindow(windowHeight);
        }

        function addKeyWindow(windowHeight) {
            var myWindow = addWindow();

            myWindow.name = "Key Panel";
            myWindow.route = '/app/colourbykey/key.html';
            myWindow.elementId = "key";
            myWindow.closingNotification = "ClosingKey";
            myWindow.x = '90%';
            myWindow.y = 0;
            myWindow.width = '10%';
            myWindow.height = windowHeight;
            windows.push(myWindow);
        }


        function addKeyPanelWindow() {
            var myWindow = addWindow();

            myWindow.name = "Key Panel";
            myWindow.route = '/app/keyPanel/keyPanel.html';
            myWindow.elementId = "key-panel";
            myWindow.closingNotification = "ClosingKeyPanel";

            // We dont want to see this panel for Valero, but it does cause functionality to trigger
            // hide it offscreen for now
            myWindow.x = -3000;
            myWindow.y = -3000;
            myWindow.width = 0;
            myWindow.height = 0;

            windows.push(myWindow);
        }

        function addKpiWindow() {
            var blankingWindow = addWindow();

            blankingWindow.name = "KPI Blanking Window";
            blankingWindow.route = '/app/kpi/blankingWindow.html';
            blankingWindow.elementId = "KpiBlankingWindow";
            blankingWindow.x = 0;
            blankingWindow.y = 0;
            blankingWindow.width = '100%';
            blankingWindow.height = '100%';
            windows.push(blankingWindow);

            var myWindow = addWindow();
            myWindow.name = "KPI Data";
            myWindow.route = '/app/kpi/kpi.html';
            myWindow.elementId = "Kpi";
            myWindow.x = 0;
            myWindow.y = 0;
            myWindow.width = '50%';
            myWindow.height = '100%';
            myWindow.closingNotification = "ClosingKpiChart";
            windows.push(myWindow);

        }

        function addKpiChartWindow(chartType, startDate, endDate) {

            var myWindow = addWindow();

            myWindow.name = "KPI Chart";
            myWindow.route = '/app/kpi/kpiChart.html';
            myWindow.elementId = "KpiChart";
            myWindow.x = "50%";
            myWindow.y = 0;
            myWindow.width = "50%";
            myWindow.height = "100%";
            myWindow.args = { chartType: chartType, startDate: startDate, endDate: endDate };
            windows.push(myWindow);
        }

        function addKpiGoalsWindow() {
            var myWindow = addWindow();
            myWindow.x = '0%';
            myWindow.y = 0;
            myWindow.width = "50%";
            myWindow.height = "100%";
            myWindow.name = "KPI Goals";
            myWindow.route = '/app/kpi/kpiGoals.html';
            myWindow.elementId = "KpiGoals";
            windows.push(myWindow);
        }

        function addSettingsWindow() {
            var myWindow = addWindow();

            myWindow.name = "Settings";
            myWindow.route = '/app/settings/settings.html';
            myWindow.minWidth = 400;
            myWindow.minHeight = 200;

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