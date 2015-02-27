using QuadCtrl.Infrastructure.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace QuadCtrl.Infrastructure.EntityFramework.Entities
{
    public class ActiveQuads
    {
        [Key]
        public virtual int ID { get; set; }

        [Required]
        public virtual string QuadId { get; set; }

        [Required]
        public virtual CommsOptions SupportedComms { get; set; }

        [Required]
        public virtual IMUOpions SupportedIMU { get; set; }

        [Required]
        public virtual GPSOptions SupportGPS { get; set; }

        [Required]
        public virtual AltimeterOptions SupportedAlt { get; set; }

        [Required]
        public virtual bool InUse { get; set; }
        
    }
}