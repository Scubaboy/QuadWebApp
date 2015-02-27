using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace QuadCtrl.Infrastructure.Models
{
    public enum CommsOptions
    {
        Xbee,
        GSMModem
    }

    public enum IMUOpions
    {
        DCM,
        MPU
    }

    public enum GPSOptions
    {
        MKV11
    }

    public enum AltimeterOptions
    {
        GPS,
        Altic,
        CGPSALtic
    }
}