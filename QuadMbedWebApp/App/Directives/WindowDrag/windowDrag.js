(function () {
    'use strict'

    var directiveId = "winDragDirect";

    angular.module('app').directive(directiveId, ['windowManager', winDrag]);

    function winDrag(windowManager) {

        function link(scope, element, attr) {
            var startX = 0, startY = 0, windowId = attr.windowid;

            var myWindow = windowManager.getWindowById(windowId);

            var maximised = false;
            var oldx = 0, oldy = 0, oldWidth = 0, oldHeight = 0, zIndex = 1;

            element.on('mousedown', function (event) {

                // Prevent default dragging of selected content
                //event.preventDefault();

                windowManager.bringWindowToFront(windowId);

                var parent;
                if (isNaN(myWindow.x)) {
                    parent = element.parent().parent()[0];
                    myWindow.x = getSizeFromPercentageString(myWindow.x, parent.scrollWidth);
                }
                if (isNaN(myWindow.y)) {
                    parent = element.parent().parent()[0];
                    myWindow.y = getSizeFromPercentageString(myWindow.y, parent.scrollHeight);
                }

                if (inHeader()) {
                    startX = event.pageX - myWindow.x;
                    startY = event.pageY - myWindow.y;
                    $document.on('mousemove', dragMousemove);
                    $document.on('mouseup', dragMouseup);
                    return;
                } else if (inBottomRightCorner() && !myWindow.docked && !myWindow.maximised) {
                    startX = event.pageX;
                    startY = event.pageY;
                    oldWidth = myWindow.width;
                    oldHeight = myWindow.height;
                    $document.on('mousemove', bottomRightMousemove);
                    $document.on('mouseup', bottomRightMouseup);
                    return;
                } else if (inBottomLeftCorner() && !myWindow.docked && !myWindow.maximised) {
                    startX = event.pageX;
                    startY = event.pageY;
                    oldWidth = myWindow.width;
                    oldHeight = myWindow.height;
                    $document.on('mousemove', bottomLeftMousemove);
                    $document.on('mouseup', bottomLeftMouseup);
                    return;
                }

            });

            element.on('dblclick', function (event) {
                if (!inHeader()) {
                    return;
                }

                if (maximised) {
                    maximised = false;
                    myWindow.width = oldWidth;
                    myWindow.height = oldHeight;
                    myWindow.x = oldx;
                    myWindow.y = oldy;
                    zIndex = 1;
                } else {
                    maximised = true;
                    oldx = myWindow.x;
                    oldy = myWindow.y;
                    oldWidth = myWindow.width;
                    oldHeight = myWindow.height;
                    zIndex = 999;
                    myWindow.height = '100%';
                    myWindow.width = '100%';
                    myWindow.x = 0;
                    myWindow.y = 0;
                }

                element.css({
                    top: myWindow.y + 'px',
                    left: myWindow.x + 'px',
                    height: myWindow.height,
                    width: myWindow.width,
                    zIndex: zIndex
                });

                logPositions();
            });

            element.on('mouseleave', function (event) {
                setHeader(false);
            });

            element.on('mousemove', function (event) {
                if (inHeader()) {
                    setHeader(true);
                    element.css({
                        cursor: 'pointer'
                    });
                } else if (!myWindow.docked && !myWindow.maximised && inBottomRightCorner()) {
                    setHeader(false);
                    element.css({
                        cursor: 'nw-resize'
                    });
                } else if (!myWindow.docked && !myWindow.maximised && inBottomLeftCorner()) {
                    setHeader(false);
                    element.css({
                        cursor: 'sw-resize'
                    });
                } else {
                    setHeader(false);
                    element.css({

                        cursor: 'default'
                    });
                }
            });

            var showHeader = false;
            function setHeader(state) {
                if (showHeader == state) {
                    return;
                } else {
                    myWindow.showHeader = state;
                    showHeader = state;
                    scope.$apply();
                }
            }

            function dragMousemove(event) {
                // dont drag if maximised
                if (maximised) {
                    return;
                }

                // if docked wait for enough of an offset to undock
                if (myWindow.docked) {
                    if ((Math.pow(event.pageY - startY, 2) + Math.pow(event.pageX - startX, 2)) > 10000) {

                        myWindow.docked = false;

                        var parent = element.parent().parent()[0];

                        // resize the window down a little
                        myWindow.width = getSizeFromPercentageString("40%", parent.scrollWidth);
                        myWindow.height = getSizeFromPercentageString("60%", parent.scrollHeight);

                        myWindow.y = event.pageY - parent.offsetTop;
                        myWindow.x = event.pageX - parent.offsetLeft;
                        startX = event.pageX - myWindow.x;
                        startY = event.pageY - myWindow.y;
                    } else {
                        return;
                    }
                } else {
                    myWindow.y = event.pageY - startY;
                    myWindow.x = event.pageX - startX;
                }

                //maybe have a size/position object to send position data?
                $rootScope.$emit('WindowDragMouseDown', myWindow.elementId, myWindow.x, myWindow.y, myWindow.width, myWindow.height);

                element.css({
                    top: myWindow.y + 'px',
                    left: myWindow.x + 'px',
                    height: myWindow.height + 'px',
                    width: myWindow.width + 'px'
                });
            }

            function bottomRightMousemove(event) {
                // dont drag if maximised
                if (maximised || myWindow.docked) {
                    return;
                }

                myWindow.height = oldHeight + event.pageY - startY;
                myWindow.width = oldWidth + event.pageX - startX;

                enforceMinimumSizes();

                $rootScope.$emit('WindowResize', myWindow.elementId, myWindow.width, myWindow.height);

                element.css({
                    top: myWindow.y + 'px',
                    left: myWindow.x + 'px',
                    height: myWindow.height + 'px',
                    width: myWindow.width + 'px'
                });
            }

            function enforceMinimumSizes() {
                if (myWindow.height < myWindow.minHeight) {
                    myWindow.height = myWindow.minHeight;
                }
                if (myWindow.width < myWindow.minWidth) {
                    myWindow.width = myWindow.minWidth;
                }
            }

            function bottomLeftMousemove(event) {
                // dont drag if maximised
                if (maximised || myWindow.docked) {
                    return;
                }

                var right = myWindow.x + myWindow.width;
                var top = myWindow.y;

                myWindow.height = oldHeight + event.pageY - startY;
                myWindow.width = oldWidth + startX - event.pageX;

                enforceMinimumSizes();

                myWindow.x = right - myWindow.width;

                $rootScope.$emit('WindowResize', myWindow.elementId, myWindow.width, myWindow.height);

                //var parent = element.parent().parent()[0];
                //myWindow.y = event.pageY - parent.offsetTop - myWindow.height;
                //myWindow.x = event.pageX - parent.offsetLeft;

                element.css({
                    top: myWindow.y + 'px',
                    left: myWindow.x + 'px',
                    height: myWindow.height + 'px',
                    width: myWindow.width + 'px'
                });
            }

            function redrawIfOffScreen() {
                // check we haven't dragged the object out of the available area
                var redraw = false;
                if (myWindow.x < 0) {
                    myWindow.x = 0;
                    redraw = true;
                }
                if (myWindow.y < 0) {
                    myWindow.y = 0;
                    redraw = true;
                }

                // get the available height and width
                // this is the grandparent element to the current object
                var parent = element.parent().parent();
                var availableHeight = parent[0].offsetHeight;
                var availableWidth = parent[0].offsetWidth;
                if (myWindow.y > (availableHeight - myWindow.height)) {
                    myWindow.y = availableHeight - myWindow.height;
                    redraw = true;
                }

                if (myWindow.x > (availableWidth - myWindow.width)) {
                    myWindow.x = availableWidth - myWindow.width;
                    redraw = true;
                }

                if (redraw) {
                    element.css({
                        top: myWindow.y + 'px',
                        left: myWindow.x + 'px'
                    });
                }
            }

            function dragMouseup() {
                redrawIfOffScreen();

                $document.off('mousemove', dragMousemove);
                $document.off('mouseup', dragMouseup);

                $rootScope.$emit('WindowDragMouseUp', windowId, myWindow.x, myWindow.y);
            }

            function bottomRightMouseup() {
                redrawIfOffScreen();
                $document.off('mousemove', bottomRightMousemove);
                $document.off('mouseup', bottomRightMouseup);

                $rootScope.$emit('WindowResizeEnd', myWindow.elementId, myWindow.width, myWindow.height);

            }

            function bottomLeftMouseup() {
                redrawIfOffScreen();
                $document.off('mousemove', bottomLeftMousemove);
                $document.off('mouseup', bottomLeftMouseup);

                $rootScope.$emit('WindowResizeEnd', myWindow.elementId, myWindow.width, myWindow.height);


            }

            function logPositions() {
                console.log("event.pageX " + event.pageX + " event.pageY " + event.pageY);

                console.log("startX " + startX + " startY " + startY);
                console.log("myWindow.x " + myWindow.x + " myWindow.y " + myWindow.y);
            }

            function inHeader() {
                var parent = element.parent().parent()[0];

                var headerXStart = parent.offsetLeft;
                if ((isNaN(myWindow.x))) {
                    headerXStart += getSizeFromPercentageString(myWindow.x, parent.scrollWidth);
                } else {
                    headerXStart += myWindow.x;
                }

                var headerXEnd = headerXStart;

                if (isNaN(myWindow.width)) {
                    headerXEnd += getSizeFromPercentageString(myWindow.width, parent.scrollWidth);
                } else {
                    headerXEnd += myWindow.width;
                }

                var headerYStart = parent.offsetTop;
                if (isNaN(myWindow.y)) {
                    headerYStart += getSizeFromPercentageString(myWindow.y, parent.scrollHeight);
                } else {
                    headerYStart += myWindow.y;
                }

                var headerYEnd = headerYStart + 20;

                if (event.pageX >= headerXStart && event.pageX <= headerXEnd && event.pageY >= headerYStart && event.pageY <= headerYEnd) {
                    return true;
                }

                return false;
            }

            function inBottomRightCorner() {
                var parent = element.parent().parent()[0];

                var windowXStart = parent.offsetLeft;
                if ((isNaN(myWindow.x))) {
                    windowXStart += getSizeFromPercentageString(myWindow.x, parent.scrollWidth);
                } else {
                    windowXStart += myWindow.x;
                }

                var windowXEnd = windowXStart;

                if (isNaN(myWindow.width)) {
                    windowXEnd += getSizeFromPercentageString(myWindow.width, parent.scrollWidth);
                } else {
                    windowXEnd += myWindow.width;
                }

                var windowYStart = parent.offsetTop;
                if (isNaN(myWindow.y)) {
                    windowYStart += getSizeFromPercentageString(myWindow.y, parent.scrollHeight);
                } else {
                    windowYStart += myWindow.y;
                }

                var windowYEnd = windowYStart;
                if (isNaN(myWindow.height)) {
                    windowYEnd += getSizeFromPercentageString(myWindow.height, parent.scrollHeight);
                } else {
                    windowYEnd += myWindow.height;
                }


                if (event.pageX >= (windowXEnd - 3) && event.pageX <= windowXEnd && event.pageY >= (windowYEnd - 3) && event.pageY <= windowYEnd) {
                    return true;
                }

                return false;
            }

            function inBottomLeftCorner() {
                var parent = element.parent().parent()[0];

                var windowXStart = parent.offsetLeft;
                if ((isNaN(myWindow.x))) {
                    windowXStart += getSizeFromPercentageString(myWindow.x, parent.scrollWidth);
                } else {
                    windowXStart += myWindow.x;
                }

                var windowYStart = parent.offsetTop;
                if (isNaN(myWindow.y)) {
                    windowYStart += getSizeFromPercentageString(myWindow.y, parent.scrollHeight);
                } else {
                    windowYStart += myWindow.y;
                }

                var windowYEnd = windowYStart;
                if (isNaN(myWindow.height)) {
                    windowYEnd += getSizeFromPercentageString(myWindow.height, parent.scrollHeight);
                } else {
                    windowYEnd += myWindow.height;
                }


                if (event.pageX >= windowXStart && event.pageX <= (windowXStart + 3) && event.pageY >= (windowYEnd - 3) && event.pageY <= windowYEnd) {
                    return true;
                }

                return false;
            }

            function getSizeFromPercentageString(percent, fullSize) {
                percent = percent.substring(0, percent.length - 1);

                return percent * fullSize / 100;
            }
        };

        return {
            link: link
        }
    }
})()