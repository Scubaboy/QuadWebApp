using QuadCtrl.Infrastructure.EntityFramework.Event_Arguments.UpdateTrackerMonitorEventArguments;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace QuadCtrl.Infrastructure.EntityFramework.Interfaces
{
   public interface ITrackUpdateMonitor
    {
        bool Start();
        bool Stop();

        event EventHandler<UpdateTrackMonitorEvtArgs> TrackUpdateMonitorChange;
    }
}
