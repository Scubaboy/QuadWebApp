using QuadCtrl.Infrastructure.EntityFramework.Entities;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace QuadCtrl.Infrastructure.EntityFramework.DbContexts
{
    public class QuadDbContext : DbContext
    {
        public DbSet<ActiveQuads> Quads { get; set; }

        public QuadDbContext(string connectionString) :
            base(connectionString)
        {
            
        }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Entity<ActiveQuads>();
        }
    }
}