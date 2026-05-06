using ESHOP.Core.Enums;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ESHOP.Core.Models
{
    [Table("product_variants")]
    public class Product_variant
    {
        [Key]
        public int id { get; set; }

        [Required]
        public int product_id { get; set; }

        [ForeignKey(nameof(product_id))]
        public Product Product { get; set; }

        public size_enum size { get; set; }

        public color_enum color { get; set; }

        [Required]
        public string sku { get; set; }

        public decimal? price_adjustment { get; set; }

        public int stock_quantity { get; set; }

        public bool is_active { get; set; }

        public DateTime created_at { get; set; } = DateTime.UtcNow;

        public DateTime updated_at { get; set; } = DateTime.UtcNow;
    }
}
