using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace QuadCtrl.Infrastructure.Models
{
    public class ActiveQuad
    {
        public string QuadId { get; set; }
        public CommsOptions SupportedComms { get; set; }
        public IMUOpions SupportedIMU { get; set; }
        public GPSOptions SupportGPS { get; set; }
        public AltimeterOptions SupportedAlt { get; set; }
        public bool InUse { get; set; }
    }
}