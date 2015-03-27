using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace QuadCtrl.Infrastructure.Config.WebConf_Reader
{
    internal interface IConfigReader
    {
        /// <summary>
        /// Get the configuration.
        /// </summary>
        /// <returns>The <see cref="ConfigSettings"/>.</returns>
        ConfigSettings GetConfiguration();
    }
}
