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
        void Add(ActiveQuad newQuad);
        void Update(ActiveQuad quad);
        List<ActiveQuad> AvailableQuads();
    }
}
