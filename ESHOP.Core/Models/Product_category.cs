using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace ESHOP.Core.Models
{
    [Table("product_categories")]
    public class Product_category
    {
        [ForeignKey("Product")]
        public int product_ID { get; set; }

        public  Product Product { get; set; }

        [ForeignKey("Category")]

        public int category_ID { get; set; }

        public Category Category { get; set; }



 

    }
}
