using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace QuadCtrl.Infrastructure.SystemStorage
{
   public interface IStorageItemSpecific<T> : IStorageItemGeneral
    {
        T Item { get; set; }
    }
}
