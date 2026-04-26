using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ESHOP.Core.Models
{
    [Table("Product_images")]
    public class Product_image
    {
        public int Id { get; set; }

        [ForeignKey("Product")]
        public int product_ID { get; set; }

        public virtual Product Product { get; set; }

        public string image_url { get; set; }

        public int sort_order { get; set; }

        public bool is_primary { get; set; }

    }
}
