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

        [Required]
        public string name { get; set; }

        [Required]
        public string slug { get; set; }

        public string description { get; set; }

        public int? parent_category_id { get; set; }

        [ForeignKey(nameof(parent_category_id))]
        public Category ParentCategory { get; set; }

        public string image_url { get; set; }

        public DateTime created_at { get; set; } = DateTime.UtcNow;
    }
}