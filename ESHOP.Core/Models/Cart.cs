using Microsoft.EntityFrameworkCore.Metadata;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ESHOP.Core.Models
{
    [Table("cart")]
    public class Cart
    {
        [Key]
        public int id { get; set; }
        [ForeignKey("User")]
        public int user_id { get; set; }

        public User User { get; set; }

        public int session_id { get; set; }

        //DB datatype is timestamp
        //public DateTime Created_at { get; set; } = DateTime.UtcNow;

        //public DateTime updated_at { get; set; } = DateTime.Now;
    }
}
