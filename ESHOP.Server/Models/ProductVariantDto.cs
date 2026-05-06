namespace ESHOP.Server.Models;

public class ProductVariantDto
{
    public int Id { get; set; }
    public int ProductId { get; set; }
    public string Size { get; set; } = string.Empty;
    public string Color { get; set; } = string.Empty;
    public string Sku { get; set; } = string.Empty;
    public decimal? PriceAdjustment { get; set; }
    public int StockQuantity { get; set; }
    public bool IsActive { get; set; }
}

public class CreateProductVariantDto
{
    public int ProductId { get; set; }
    public string Size { get; set; } = string.Empty;  // "S","M","L",...
    public string Color { get; set; } = string.Empty; // "Black","Red",...
    public string Sku { get; set; } = string.Empty;
    public decimal? PriceAdjustment { get; set; }
    public int StockQuantity { get; set; }
    public bool IsActive { get; set; } = true;
}

public class UpdateProductVariantDto : CreateProductVariantDto { }