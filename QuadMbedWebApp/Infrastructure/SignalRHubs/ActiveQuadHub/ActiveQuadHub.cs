using Microsoft.AspNet.SignalR;
using QuadCtrl.Infrastructure.EntityFramework.Interfaces;
using QuadCtrl.Infrastructure.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;

namespace QuadCtrl.Infrastructure.SignalRHubs.ActiveQuadHub
{
    public class ActiveQuadHub : Hub
    {
        private IActiveQuadsCtrl activeQuadCtrl;

        public ActiveQuadHub(IActiveQuadsCtrl activeQuads)
        {
            this.activeQuadCtrl = activeQuadCtrl;
        }

        public void ClientUpdateActiveQuad(ActiveQuad quad)
        {

        }

        public async Task<List<ActiveQuad>> GetActiveQuads()
        {
            return await Task.Run(() =>
                {
                    return activeQuadCtrl.AvailableQuads();
                });
        }
    }
}