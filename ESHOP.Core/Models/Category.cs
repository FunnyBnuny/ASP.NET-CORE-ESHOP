using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace ESHOP.Core.Models
{
    [Table("categories")]
    public class Category
    {
        [Key]
        public int id { get; set; }

        public string name { get; set; }

        public string slug { get; set; }

        public string description { get; set; }

        [ForeignKey("category_id")]
        public int parent_category_ID { get; set; }

        public Product_category Product_category { get; set; } 

        public string image_Url { get; set; }

       //DB datatype is timestamp
       public DateTime created_at { get; set; } = DateTime.UtcNow;


 

    }
}
