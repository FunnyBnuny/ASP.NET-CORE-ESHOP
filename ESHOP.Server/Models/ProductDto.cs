namespace ESHOP.Server.Models
{
    public class ProductDto
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Slug { get; set; } = string.Empty;
        public string? Description { get; set; }
        public decimal BasePrice { get; set; }
        public decimal? DiscountPrice { get; set; }
        public bool IsActive { get; set; }
        public bool IsFeatured { get; set; }
        public string? Details { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}
