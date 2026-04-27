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

        [Required]
        public int user_id { get; set; }

        [ForeignKey(nameof(user_id))]
        public User User { get; set; }

        [Required]
        public int product_id { get; set; }

        [ForeignKey(nameof(product_id))]
        public Product Product { get; set; }

        public int rating { get; set; }

        public string title { get; set; }

        public string comment { get; set; }

        public bool is_approved { get; set; }

        public DateTime created_at { get; set; } = DateTime.UtcNow;
    }
}