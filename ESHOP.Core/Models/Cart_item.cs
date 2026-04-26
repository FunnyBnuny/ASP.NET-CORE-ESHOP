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
    [Table("cart_items")]
    public class Cart_item
    {
        [Key]
        public int id { get; set; }
        
        
        [ForeignKey("Cart")]
        public int cart_id { get; set; }

        public virtual Cart Cart { get; set; }

        [ForeignKey("Product_variant")]
        public int product_variant_id { get; set; }

        public  Product_variant Product_variant { get; set; }

        public int quantity { get; set; }
    }
}
