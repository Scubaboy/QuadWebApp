using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace QuadCtrl.Infrastructure.EntityFramework.Entities
{
    /// <summary>
    /// Class defines the structure of a DB update tracking entity.
    /// </summary>
    public class UpdateTracker
    {
        [Key]
        public virtual int ID { get; set; }

        [Required]
        public virtual DbUpdate UpdateMade { get; set; }

        [Required]
        public virtual string MadeBy { get; set; }

        [Required]
        public virtual DateTime TimeStamp { get; set; }
    }
}