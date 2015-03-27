using QuadCtrl.Infrastructure.EntityFramework.DbContexts;
using QuadCtrl.Infrastructure.EntityFramework.Entities;
using QuadCtrl.Infrastructure.EntityFramework.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace QuadCtrl.Infrastructure.EntityFramework.Repositories.Active
{
    public class ActiveQuadRepositoryActive : IRepository<ActiveQuads>
    {
        private IRepository<ActiveQuads> passiveRepos;
        private QuadDbContext db;
        private IActiveReposIdProvider activeId;

        public ActiveQuadRepositoryActive(IRepository<ActiveQuads> passiveRepos, QuadDbContext db, IActiveReposIdProvider activeId)
        {
            this.passiveRepos = passiveRepos;
            this.db = db;
            this.activeId = activeId;
        }

        public IList<ActiveQuads> All
        {
            get { return this.passiveRepos.All; }
        }

        public void Add(ActiveQuads item)
        {
            this.passiveRepos.Add(item);
            this.db.UpdateTracker.Add(new UpdateTracker
            {
                MadeBy = this.activeId.Id,
                UpdateMade = DbUpdate.ActiveQuad,
                TimeStamp = DateTime.Now
            });

        }

        public void Remove(ActiveQuads item)
        {
            this.passiveRepos.Remove(item);
            this.db.UpdateTracker.Add(new UpdateTracker
            {
                MadeBy = this.activeId.Id,
                UpdateMade = DbUpdate.ActiveQuad,
                TimeStamp = DateTime.Now
            });
        }

        public void Update(ActiveQuads item)
        {
            this.passiveRepos.Update(item);
            this.db.UpdateTracker.Add(new UpdateTracker
            {
                MadeBy = this.activeId.Id,
                UpdateMade = DbUpdate.ActiveQuad,
                TimeStamp = DateTime.Now
            });
        }

        public void Clear()
        {
            this.passiveRepos.Clear();
            this.db.UpdateTracker.Add(new UpdateTracker
            {
                MadeBy = this.activeId.Id,
                UpdateMade = DbUpdate.ActiveQuad,
                TimeStamp = DateTime.Now
            });
        }
    }
}