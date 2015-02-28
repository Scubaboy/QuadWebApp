using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace QuadCtrl.Infrastructure.EntityFramework.StoreControllers.ActiveQuadsStoreController.Exceptions
{
    public class ActiveQuadStoreException : Exception
    {
        public ActiveQuadStoreException(string reason) : base(reason)
        {

        }
    }
}