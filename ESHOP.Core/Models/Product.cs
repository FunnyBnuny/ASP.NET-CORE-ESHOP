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

        [Required]
        public string name { get; set; }

        [Required]
        public string slug { get; set; }

        public string description { get; set; }

       
        public decimal base_price { get; set; }

       
        public decimal? discount_price { get; set; }

        public string details { get; set; } // JSON string

        public bool is_active { get; set; }

        public bool is_featured { get; set; }

        public DateTime created_at { get; set; } = DateTime.UtcNow;

        public DateTime updated_at { get; set; } = DateTime.UtcNow;
    }
}
