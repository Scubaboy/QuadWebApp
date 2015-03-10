using QuadCtrl.Infrastructure.EntityFramework.Entities;
using QuadCtrl.Infrastructure.EntityFramework.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace QuadCtrl.Infrastructure.EntityFramework.Stores
{
    public class ActiveQuadsStore : IActiveQuads
    {
        private IRepository<ActiveQuads> activeQuads;

        public ActiveQuadsStore(IRepository<ActiveQuads> repository)
        {
            this.Quads = repository;
        }
        public IRepository<Entities.ActiveQuads> Quads
        {
            get;
            private set;
        }
    }
}