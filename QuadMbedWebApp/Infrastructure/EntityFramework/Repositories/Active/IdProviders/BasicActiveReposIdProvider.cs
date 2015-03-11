using QuadCtrl.Infrastructure.EntityFramework.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace QuadCtrl.Infrastructure.EntityFramework.Repositories.Active.IdProviders
{
    public class BasicActiveReposIdProvider : IActiveReposIdProvider
    {
        private readonly string timeId;

        public BasicActiveReposIdProvider()
        {
            timeId = new TimeSpan(DateTime.Now.Ticks).TotalMilliseconds.ToString();
        }

        public string Id
        {
            get { return "Web" + timeId; }
        }
    }
}