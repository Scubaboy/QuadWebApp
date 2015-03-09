using QuadCtrl.Infrastructure.EntityFramework.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace QuadCtrl.Infrastructure.EntityFramework.Interfaces
{
    public interface IUpdateTrackerRepos
    {
        IRepository<UpdateTracker> TrackedUpdates { get; }
    }
}
