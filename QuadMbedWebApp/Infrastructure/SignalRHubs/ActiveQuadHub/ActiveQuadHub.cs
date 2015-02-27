using Microsoft.AspNet.SignalR;
using QuadCtrl.Infrastructure.EntityFramework.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace QuadCtrl.Infrastructure.SignalRHubs.ActiveQuadHub
{
    public class ActiveQuadHub : Hub
    {


        public ActiveQuadHub(IActiveQuads activeQuads)
        {

        }
    }
}