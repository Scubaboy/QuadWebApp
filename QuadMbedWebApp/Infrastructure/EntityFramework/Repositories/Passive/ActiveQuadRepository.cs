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
    public class ActiveQuadRepository : IRepository<ActiveQuads>
    {
        private DbSet<ActiveQuads> dbSet;
        private QuadDbContext db;

        public ActiveQuadRepository(QuadDbContext db)
        {
            this.dbSet = db.Quads;
            this.db = db;
        }

        public IEnumerable<ActiveQuads> All
        {
            get 
            {
                return this.dbSet;
            } 
        }

        public void Add(ActiveQuads item)
        {
            this.dbSet.Add(item);
            this.db.SaveChanges();
        }

        public void Remove(ActiveQuads item)
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
            }

            this.db.SaveChanges();
        }


        public void Update(ActiveQuads item)
        {
            this.db.Entry(item).State = EntityState.Modified;
            this.db.SaveChanges();
        }
    }
}