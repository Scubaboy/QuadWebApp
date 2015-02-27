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
        bool Add(ActiveQuad newQuad);
    }
}
