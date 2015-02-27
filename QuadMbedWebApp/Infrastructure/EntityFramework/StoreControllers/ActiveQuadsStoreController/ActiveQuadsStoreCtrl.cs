using QuadCtrl.Infrastructure.EntityFramework.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace QuadCtrl.Infrastructure.EntityFramework.StoreControllers.ActiveQuadsStoreController
{
    public class ActiveQuadsStoreCtrl : IActiveQuadsCtrl
    {
        IActiveQuads repos;

        public ActiveQuadsStoreCtrl(IActiveQuads activeQuads)
        {
            this.repos = activeQuads;
        }

        public bool Add(Models.ActiveQuad newQuad)
        {
           
            throw new NotImplementedException();
        }
    }
}