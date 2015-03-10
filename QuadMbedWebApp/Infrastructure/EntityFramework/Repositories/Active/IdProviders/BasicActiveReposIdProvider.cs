using QuadCtrl.Infrastructure.EntityFramework.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace QuadCtrl.Infrastructure.EntityFramework.Repositories.Active.IdProviders
{
    public class BasicActiveReposIdProvider : IActiveReposIdProvider
    {
        public string Id
        {
            get { return "Web" + DateTime.Now.ToUniversalTime(); }
        }
    }
}