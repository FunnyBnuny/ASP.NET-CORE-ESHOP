using System.ComponentModel.DataAnnotations;

namespace ESHOP.Server.Models
{
    public class CreateProductDto
    {
        [Required]
        public string Name { get; set; } = string.Empty;
        [Required]
        public string Slug { get; set; } = string.Empty;
        public string? Description { get; set; }
        public decimal BasePrice { get; set; }
        public decimal? DiscountPrice { get; set; }
        public string? Details { get; set; }
        public bool IsActive { get; set; } = true;
        public bool IsFeatured { get; set; } = false;
    }

}
