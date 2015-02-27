using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace QuadCtrl.Infrastructure.SystemStorage.LocalStorage
{
    public class MemoryStorage : IStore
    {
        private ConcurrentDictionary<Stores, IStorageItemGeneral>  theStore = new ConcurrentDictionary<Stores, IStorageItemGeneral>();

        public IStorageItemGeneral GetItem(Stores item)
        {
            IStorageItemGeneral thevalue;

            var result = theStore.TryGetValue(item, out thevalue);

            return thevalue;
        }

        public void SetItem(Stores item, IStorageItemGeneral itemToAdd)
        {
            var result = theStore.TryAdd(item, itemToAdd);
        }
    }
}