using QuadCtrl.Infrastructure.EntityFramework.DbContexts;
using QuadCtrl.Infrastructure.EntityFramework.Entities;
using QuadCtrl.Infrastructure.EntityFramework.Interfaces;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace QuadCtrl.Infrastructure.EntityFramework.Repositories.Passive
{
    public class UpdateTrackerRepository : IRepository<UpdateTracker>
    {
        private DbSet<UpdateTracker> dbSet;
        private QuadDbContext db;

        public UpdateTrackerRepository(QuadDbContext db)
        {
            this.dbSet = db.UpdateTracker;
            this.db = db;
        }

        public IList<UpdateTracker> All
        {
            get 
            {
                return this.dbSet.ToList();
            } 
        }

        public void Add(UpdateTracker item)
        {
            this.dbSet.Add(item);
            this.db.SaveChanges();
        }

        public void Remove(UpdateTracker item)
        {
            this.dbSet.Remove(item);
            this.db.SaveChanges();
        }

        public void Clear()
        {
            if (this.dbSet.Any())
            {
                foreach (var item in this.dbSet)
                {
                    this.dbSet.Remove(item);
                }

                this.db.SaveChanges();
            }

        }


        public void Update(UpdateTracker item)
        {
            this.db.Entry(item).State = EntityState.Modified;
            this.db.SaveChanges();
        }
    }
}