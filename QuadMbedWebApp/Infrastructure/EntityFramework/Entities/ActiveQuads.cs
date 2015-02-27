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
        
    }
}