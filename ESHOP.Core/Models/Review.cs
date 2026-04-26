using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ESHOP.Core.Models
{
    [Table("reviews")]
    public class Review
    {
        [Key]
        public int id { get; set; }
        [ForeignKey("User")]
        public int user_id { get; set; }

        public User User { get; set; }

        [ForeignKey("Product")]
        public int product_id { get; set; }

        public Product Product { get; set; }

        public int rating { get; set; }

        public string title { get; set; }
        public string comment { get; set; }

        public bool is_approved { get; set; }

        //DB datatype is timestamp
        public DateTime created_at { get; set; } = DateTime.UtcNow;

    }
}
