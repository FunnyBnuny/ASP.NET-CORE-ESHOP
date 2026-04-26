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
    [Table("products")]
    public class Product
    {
        [Key]
        public int id { get; set; }

        public string name { get; set; }

        public string slug { get; set; }

        public string description { get; set; }

        public decimal base_price { get; set; }

        public decimal discount_price { get; set; }
        //datatype json, what how 
        public string details {  get; set; } 

        public bool is_active { get; set; }

        public bool is_featured { get; set; }


        //DB datatype is timestamp
        public DateTime created_at { get; set; } = DateTime.UtcNow;

        public DateTime updated_at { get; set; } = DateTime.Now;





    }
}
