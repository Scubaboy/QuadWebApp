using QuadCtrl.Infrastructure.Consts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace QuadCtrl.Infrastructure.Config.WebConf_Reader
{
    internal class WebConfigReader : IConfigReader
    {
        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns> 
        public ConfigSettings GetConfiguration()
        {
            //Look for the required connection string
            var connString = System.Configuration.ConfigurationManager.ConnectionStrings[ConfigConstants.DBConnectionStringName];

            if (connString == null || string.IsNullOrEmpty(connString.ConnectionString))
            {
                throw new Exception("Unable to retrieve MES identify server database connection string.");
            }

            var configSettings = new ConfigSettings
            {
                DbConnString = connString.Name,
                
            };


            return configSettings;
        }
    }
}