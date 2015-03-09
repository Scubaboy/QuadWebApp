using QuadCtrl.Infrastructure.EntityFramework.Event_Arguments.UpdateTrackerMonitorEventArguments;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace QuadCtrl.Infrastructure.EntityFramework.Interfaces
{
    interface ITrackUpdateMonitor
    {
        public bool Start();
        public bool Stop();

        event EventHandler<UpdateTrackMonitorEvtArgs> TrackUpdateMonitorChange;
    }
}
