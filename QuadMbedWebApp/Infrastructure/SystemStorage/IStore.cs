using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace QuadCtrl.Infrastructure.SystemStorage
{
    public interface IStore
    {
        IStorageItemGeneral GetItem(Stores item);

        void SetItem(Stores item, IStorageItemGeneral itemToAdd);
    }
}
