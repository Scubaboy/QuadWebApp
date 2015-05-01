(function () {
    'use strict';

    var serviceId = 'sourceConfigMgr';

    angular.module('configurationManager').service(serviceId, sourceConfigMgrFct);

    function sourceConfigMgrFct() {
        var quad = undefined;
        var configSource = undefined;


        Object.defineProperty(this, 'configOptions', {
            get: function () {
                return configSource;
            }
        })

      

        this.selectedQuad = function(theQuad) {
            quad = theQuad;
            buildSourceConfigStructure();
        }

       this.takeSourceConfigItem = function (takenItem) {
           if (quad != undefined && configSource != undefined) {
               if (quad.hasConfigItem(takenItem) === undefined) {
                   var sourceItem = _.find(configSource[takenItem.key], function (item) {
                       return item.name === takenItem.item;
                   });

                   if (sourceItem !== undefined) {
                       var index = configSource[sourceItem.group].indexOf(sourceItem);

                       if (index > -1) {
                           configSource[sourceItem.group].splice(index, 1);
                       }

                       //Add the chosen config item to the quads config structure
                       quad.addConfigItem(sourceItem);
                   }
               }
               else {
              

               }
           }
        }

        this.returnConfigItemToSource = function (returnedItem) {
            if (quad != undefined && configSource != undefined) {

                var sourceItem = _.find(quad.selectedConfig, function (item) {
                    return item.name === returnedItem.item;
                });

                if (sourceItem !== undefined) {
                    configSource[sourceItem.group].push(sourceItem);

                    //Remove the config Item from the quads config structure
                    quad.removeConfigItem(sourceItem);
                }
            }
        }

        function buildSourceConfigStructure () {
            if (quad != undefined) {

                configSource = {};
                    
               buildKeyValues(quad.gpsOptions, "gps", configSource);
               buildKeyValues(quad.imuOptions, 'imu', configSource);
               buildKeyValues(quad.telemetryOptions, 'comms', configSource);
               buildKeyValues(quad.altimeterOptions, 'alt', configSource);
            }
        }

        function buildKeyValues(values, key,obj) {
            var valuelist = [];

            values.forEach(function (item) {
                valuelist.push(item);
            })
            obj[key] = valuelist;
        }
    }
})()