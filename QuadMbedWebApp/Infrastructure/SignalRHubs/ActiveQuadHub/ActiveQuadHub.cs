using Microsoft.AspNet.SignalR;
using Microsoft.AspNet.SignalR.Hubs;
using QuadCtrl.Infrastructure.EntityFramework.Interfaces;
using QuadCtrl.Infrastructure.EntityFramework.StoreControllers.ActiveQuadsStoreController.EventArgs;
using QuadCtrl.Infrastructure.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;

namespace QuadCtrl.Infrastructure.SignalRHubs.ActiveQuadHub
{
    public static class ActiveQuadConnections
    {
        public static HashSet<string> ConnectedIds = new HashSet<string>();
    }

     [HubName("ActiveQuadHub")]
    public class ActiveQuadHub : Hub
    {
        private IActiveQuadsCtrl activeQuadCtrl;

        public ActiveQuadHub(ITest activeQuads)
        {

        }
 
        public ActiveQuadHub(IActiveQuadsCtrl activeQuads)
        {
            this.activeQuadCtrl = activeQuads;
        }

        void activeQuadCtrl_ActiveQuadChange(object sender, ActiveQuadCtrlEventArgs e)
        {
            //Notify all connected clients of the change
            var activeQuads = this.activeQuadCtrl.AvailableQuads();

            this.Clients.All.ActiveQuadUpdated(activeQuads);
        }

        public void ClientUpdateActiveQuad(ActiveQuad quad)
        {

        }

        public override Task OnConnected()
        {
            ActiveQuadConnections.ConnectedIds.Add(Context.ConnectionId);

            if (ActiveQuadConnections.ConnectedIds.Count == 1)
            {
                this.activeQuadCtrl.ActiveQuadChange += activeQuadCtrl_ActiveQuadChange;
            }

            return base.OnConnected();
        }
        public override Task OnDisconnected(bool stopCalled)
        {
            ActiveQuadConnections.ConnectedIds.Remove(Context.ConnectionId);
            if (!ActiveQuadConnections.ConnectedIds.Any())
            {
                this.activeQuadCtrl.ActiveQuadChange -= activeQuadCtrl_ActiveQuadChange;
            }

            return base.OnDisconnected(stopCalled);
        }
    }
}