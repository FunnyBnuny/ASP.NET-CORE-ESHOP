using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ESHOP.Core.Models
{
    [Table("order_items")]
    public class Order_item
    {
        [Key]
        public int id { get; set; }

        [Required]
        public int order_id{ get; set; }

        [ForeignKey(nameof(order_id))]
        public Order Order { get; set; }

        [Required]
        public int product_variant_id { get; set; }

        [ForeignKey(nameof(product_variant_id))]
        public Product_variant Product_variant { get; set; }

        public int quantity { get; set; }

        public decimal unit_price { get; set; }

        public decimal total_price { get; set; }
    }
}

