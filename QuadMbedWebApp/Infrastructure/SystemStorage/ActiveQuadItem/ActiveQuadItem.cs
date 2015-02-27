using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace QuadCtrl.Infrastructure.SystemStorage.ActiveQuadItem
{
    public class ActiveQuadItem : IStorageItemSpecific<ActiveQuads>
    {
        private ActiveQuads data;

        public ActiveQuadItem()
        {
            this.Initialise();
        }

        public ActiveQuads Item
        {
            get
            {
                return this.data;
            }
            set
            {
                this.data = value;
            }
        }

        public void Initialise()
        {
            this.data = new ActiveQuads();
        }
    }
}