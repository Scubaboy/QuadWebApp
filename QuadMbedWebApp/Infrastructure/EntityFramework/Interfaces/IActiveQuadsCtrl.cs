using QuadCtrl.Infrastructure.EntityFramework.Entities;
using QuadCtrl.Infrastructure.EntityFramework.StoreControllers.ActiveQuadsStoreController.EventArgs;
using QuadCtrl.Infrastructure.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace QuadCtrl.Infrastructure.EntityFramework.Interfaces
{
    public interface IActiveQuadsCtrl
    {
        void Add(ActiveQuads newQuad);
        void Update(ActiveQuads quad);
        List<ActiveQuads> AvailableQuads();
        void Initialise();
        event EventHandler<ActiveQuadCtrlEventArgs> ActiveQuadChange;
    }
}
