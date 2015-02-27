using QuadCtrl.Infrastructure.EntityFramework.DbContexts;
using QuadCtrl.Infrastructure.EntityFramework.Entities;
using QuadCtrl.Infrastructure.EntityFramework.Interfaces;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace QuadCtrl.Infrastructure.EntityFramework.Repositories
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

        public IQueryable<ActiveQuads> All
        {
            get { throw new NotImplementedException(); }
        }

        public void Add(ActiveQuads item)
        {
            throw new NotImplementedException();
        }

        public void Remove(ActiveQuads item)
        {
            throw new NotImplementedException();
        }

        public void Clear()
        {
            throw new NotImplementedException();
        }
    }
}