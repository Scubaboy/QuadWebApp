using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace QuadCtrl.Infrastructure.SystemStorage.ActiveQuadItem
{
    public class ActiveQuads
    {
        private string id = string.Empty;

        public string ID
        {
            get
            {
                return this.id;
            }

            set
            {
                this.id = value;
            }
        }
        
    }
}