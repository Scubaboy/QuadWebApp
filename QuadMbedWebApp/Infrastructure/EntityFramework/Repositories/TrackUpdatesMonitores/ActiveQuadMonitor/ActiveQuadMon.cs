using QuadCtrl.Infrastructure.EntityFramework.Event_Arguments.UpdateTrackerMonitorEventArguments;
using QuadCtrl.Infrastructure.EntityFramework.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using System.Web;

namespace QuadCtrl.Infrastructure.EntityFramework.Repositories.TrackUpdatesMonitores.ActiveQuadMonitor
{
    public class ActiveQuadMon : ITrackUpdateMonitor
    {
        private CancellationTokenSource cancelToken = null;
        private IUpdateTrackerRepos updateTrackers;
        private Task monitorTask;
        private IActiveReposIdProvider filterId;

        public ActiveQuadMon(IActiveReposIdProvider filterId, IUpdateTrackerRepos updateTrackers)
        {
         //   this.updateTrackers = updateTrackers;
            this.cancelToken = null;
            this.monitorTask = null;
            this.filterId = filterId;
        }

        public bool Start()
        {
            var started = true;

            if (this.cancelToken == null || this.cancelToken.IsCancellationRequested)
            {
                this.cancelToken = new CancellationTokenSource();

                //Get starting snap shot of the current updates made
                var currentUpdates = this.updateTrackers.TrackedUpdates.All.ToList();

                this.monitorTask = Task.Run(() =>
                     {
                         while (!this.cancelToken.Token.IsCancellationRequested)
                         {
                             var updatesNow = this.updateTrackers.TrackedUpdates.All.ToList();

                             if (DateTime.Compare(updatesNow.Last().TimeStamp, currentUpdates.Last().TimeStamp) != 0)
                             {
                                 this.OnTrackUpdateMonitorChange(new UpdateTrackMonitorEvtArgs());
                                 currentUpdates = updatesNow;
                             }

                             Thread.Sleep(1000);
                         }
                     }, this.cancelToken.Token);
            }
            
            return started;
            
        }

        public event EventHandler<UpdateTrackMonitorEvtArgs> TrackUpdateMonitorChange;


        public bool Stop()
        {
            var result = false;

            if (this.cancelToken != null)
            {
                this.cancelToken.Cancel(false);
                result = true;
            }

            return result;
        }

        protected void OnTrackUpdateMonitorChange(UpdateTrackMonitorEvtArgs eventArgs)
        {
            EventHandler<UpdateTrackMonitorEvtArgs> handler = TrackUpdateMonitorChange;

            if (handler != null)
            {
                handler(this, eventArgs);
            }
        }
    }
}