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

        public IQueryable<UpdateTracker> All
        {
            get 
            {
                return this.dbSet;
            } 
        }

        public void Add(UpdateTracker item)
        {
            this.dbSet.Add(item);
        }

        public void Remove(UpdateTracker item)
        {
            this.dbSet.Remove(item);
        }

        public void Clear()
        {
            if (this.dbSet.Any())
            {
                foreach (var item in this.dbSet)
                {
                    this.dbSet.Remove(item);
                }
            }
        }

        public void Save()
        {
            try
            {
                this.db.SaveChanges();
            }
            catch (Exception)
            {
                var errors = this.db.GetValidationErrors();

                if (errors.Any())
                {

                }
            }
        }
    }
}