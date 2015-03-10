using QuadCtrl.Infrastructure.EntityFramework.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using QuadCtrl.Infrastructure.EntityFramework.Extensions;
using System.Threading.Tasks;
using QuadCtrl.Infrastructure.Models;
using QuadCtrl.Infrastructure.EntityFramework.StoreControllers.ActiveQuadsStoreController.EventArgs;
using QuadCtrl.Infrastructure.EntityFramework.Entities;
using QuadCtrl.Infrastructure.EntityFramework.Event_Arguments.UpdateTrackerMonitorEventArguments;

namespace QuadCtrl.Infrastructure.EntityFramework.StoreControllers.ActiveQuadsStoreController
{
    public class ActiveQuadsStoreCtrl : IActiveQuadsCtrl
    {
        IActiveQuads repos = null;
        ITrackUpdateMonitor updateMonitor;

        public ActiveQuadsStoreCtrl(IActiveQuads activeQuads, ITrackUpdateMonitor updateMonitor)
        {
            this.repos = activeQuads;
            this.updateMonitor = updateMonitor;
           
        }

        public void Add(ActiveQuads newQuad)
        {
            if (this.repos != null)
            {
                if (newQuad.QuadId != string.Empty && newQuad.QuadId != null)
                {
                    if (!this.repos.Quads.All.Any(x => x.QuadId == newQuad.QuadId))
                    {
                        this.repos.Quads.Add(newQuad);
                    }
                    else
                    {
                        throw new ArgumentException("QuadId already in store", "newQuad");
                    }
                }
                else
                {
                    throw new ArgumentException("QuadId is null or empty", "newQuad");
                }
            }
            else
            {
                throw new InvalidOperationException("Repository object is null");
            }

        }

        public void Update(ActiveQuads quad)
        {
            if (this.repos != null)
            {
                if (quad.QuadId != null && quad.QuadId != string.Empty)
                {
                    this.repos.Quads.Update(quad);
                }
                else
                {
                    throw new ArgumentException("Quad Id is null or empty", "quad");
                }
            }
            else
            {
                throw new InvalidOperationException("Repository is null.");
            }
        }


        public List<ActiveQuads> AvailableQuads()
        {
            if (this.repos != null)
            {
                return this.repos.Quads.All.ToList();
            }
            else
            {
                throw new InvalidOperationException("Repository is null.");
            }
        }

        protected virtual void OnActiveQuadChange(ActiveQuadCtrlEventArgs eventArgs)
        {
            EventHandler<ActiveQuadCtrlEventArgs> handler = ActiveQuadChange; 

            if (handler != null)
            {
                handler(this, eventArgs);
            }
        }

        public event EventHandler<EventArgs.ActiveQuadCtrlEventArgs> ActiveQuadChange;


        public void Initialise()
        {
            this.updateMonitor.TrackUpdateMonitorChange += updateMonitor_TrackUpdateMonitorChange;
            this.updateMonitor.Start();
        }

        void updateMonitor_TrackUpdateMonitorChange(object sender, UpdateTrackMonitorEvtArgs e)
        {
            this.OnActiveQuadChange(new ActiveQuadCtrlEventArgs());
        }
    }
}