using QuadCtrl.Infrastructure.EntityFramework.Entities;
using QuadCtrl.Infrastructure.EntityFramework.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace QuadCtrl.Infrastructure.EntityFramework.Stores
{
    public class UpdateTrackerStore: IUpdateTrackerRepos
    {
        public UpdateTrackerStore(IRepository<UpdateTracker> repository)
        {
            this.TrackedUpdates = repository;
        }

        public IRepository<UpdateTracker> TrackedUpdates { get; private set; }
    }
}