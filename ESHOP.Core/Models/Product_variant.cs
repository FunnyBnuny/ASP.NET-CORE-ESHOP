using System;
using System.Collections.Generic;
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


        public int id { get; set; }
        [ForeignKey("Product")]

        public int product_id{ get; set; }

        public Product product { get; set; }

        [ForeignKey("Size")]

        public int size_Id { get; set; }

        public Size size { get; set; }

        [ForeignKey("Color")]

        public int color_id { get; set; }

        public Color color { get; set; }

        public string sku { get; set; }

        public decimal price_adjustment { get; set; }

        public int stock_Quantity { get; set; }

        public bool is_active { get; set; }

        //DB datatype is timestamp
        public DateTime created_at { get; set; } = DateTime.UtcNow;

        public DateTime updated_at { get; set; } = DateTime.Now;



    }
}
