using QuadCtrl.Infrastructure.SystemStorage.ActiveQuadItem;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace QuadCtrl.Infrastructure.SystemStorage
{
    public interface ISystemStorage
    {
        IStorageItemSpecific<ActiveQuads> ActiveQuads { get; set; }
    }
}
