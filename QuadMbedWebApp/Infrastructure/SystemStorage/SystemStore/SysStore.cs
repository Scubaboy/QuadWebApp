using QuadCtrl.Infrastructure.SystemStorage.ActiveQuadItem;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace QuadCtrl.Infrastructure.SystemStorage.SystemStore
{
    public class SysStore : ISystemStorage
    {
        private IStore theStore;

        public SysStore(IStore theStore)
        {
            this.theStore = theStore;
        }

        public IStorageItemSpecific<ActiveQuads> ActiveQuads
        {
            get
            {
                return (IStorageItemSpecific<ActiveQuads>)this.theStore.GetItem(Stores.ActiveQuadStore);
            }
            set
            {
                if (value.Item.ID != string.Empty)
                {
                    this.theStore.SetItem(Stores.ActiveQuadStore, value);
                }
            }
        }
    }
}