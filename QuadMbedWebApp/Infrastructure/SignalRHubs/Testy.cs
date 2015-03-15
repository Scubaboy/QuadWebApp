using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace QuadCtrl.Infrastructure.SignalRHubs
{
    public class Testy : ITest
    {
        public string hello
        {
            get
            {
                return "hhh";
            }
            set
            {
                var t = value;
            }
        }
    }
}