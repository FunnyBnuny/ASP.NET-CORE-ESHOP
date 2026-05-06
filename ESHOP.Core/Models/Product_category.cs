using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Text.Json.Nodes;
using System.Threading.Tasks;


namespace ESHOP.Core.Models
{
    [Table("product_categories")]
    public class Product_category
    {
        public int product_id { get; set; }
        public Product Product { get; set; }

        public int category_id { get; set; }
        public Category Category { get; set; }
    }
}

