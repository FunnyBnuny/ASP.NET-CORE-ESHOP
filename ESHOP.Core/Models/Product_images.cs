using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ESHOP.Core.Models
{
    [Table("product_images")]
    public class Product_image
    {
        [Key]
        public int id { get; set; }

        [Required]
        public int product_id { get; set; }

        [ForeignKey(nameof(product_id))]
        public Product Product { get; set; }

        [Required]
        public string image_url { get; set; }

        public string alt_text { get; set; }

        public int sort_order { get; set; }

        public bool is_primary { get; set; }
    }
}