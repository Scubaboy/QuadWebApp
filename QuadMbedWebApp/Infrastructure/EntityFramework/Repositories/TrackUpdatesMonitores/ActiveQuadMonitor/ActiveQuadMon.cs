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

        public ActiveQuadMon(IUpdateTrackerRepos updateTrackers)
        {
            this.updateTrackers = updateTrackers;
            this.cancelToken = null;
            this.monitorTask = null;
        }

        public bool Start()
        {
            var started = true;

            if (this.cancelToken == null || this.cancelToken.IsCancellationRequested)
            {
                this.cancelToken = new CancellationTokenSource();

                this.monitorTask = Task.Run(() =>
                     {
                         while (!this.cancelToken.Token.IsCancellationRequested)
                         {

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
    }
}