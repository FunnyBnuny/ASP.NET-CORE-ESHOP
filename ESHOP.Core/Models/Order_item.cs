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

        [ForeignKey("Order")]

        public int order_id {  get; set; }

        public Order Order { get; set; }

        [ForeignKey("Product_variants")]

        public int public_variant_id { get; set; }

        public  Product_variant Product_variants {  get; set; }

        public decimal unit_price { get; set; }

        public decimal total_price { get; set; }




    }
}
