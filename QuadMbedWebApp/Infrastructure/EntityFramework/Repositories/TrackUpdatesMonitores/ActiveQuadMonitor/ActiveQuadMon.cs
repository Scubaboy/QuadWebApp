using QuadCtrl.Infrastructure.EntityFramework.Event_Arguments.UpdateTrackerMonitorEventArguments;
using QuadCtrl.Infrastructure.EntityFramework.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace QuadCtrl.Infrastructure.EntityFramework.Repositories.TrackUpdatesMonitores.ActiveQuadMonitor
{
    public class ActiveQuadMon : ITrackUpdateMonitor
    {
        public bool Start()
        {
            throw new NotImplementedException();
        }

        public event EventHandler<UpdateTrackMonitorEvtArgs> TrackUpdateMonitorChange;


        public bool Stop()
        {
            throw new NotImplementedException();
        }
    }
}