using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace QuadCtrl.Infrastructure.Config.WebConf_Reader
{
    internal class ConfigSettings
    {
        /// <summary>
        /// Gets or sets the name of the X905 certificate.
        /// </summary>
        public string X905CertName { get; set; }

        /// <summary>
        /// Gets or sets the database connection string.
        /// </summary>
        public string DbConnString { get; set; }
    }
}