using ESHOP.Core;
using ESHOP.Core.Enums;
using ESHOP.Core.Models;
using ESHOP.Server.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ESHOP.Server.Controllers;

[ApiController]
[Route("api/[controller]")]
public class VariantsController : ControllerBase
{
    private readonly EshopContext _db;
    public VariantsController(EshopContext db) => _db = db;

    [HttpGet("product/{productId}")]
    public async Task<ActionResult<IEnumerable<ProductVariantDto>>> GetByProduct(int productId)
    {
        var variants = await _db.Product_variants
            .Where(v => v.product_id == productId)
            .Select(v => new ProductVariantDto
            {
                Id = v.id,
                ProductId = v.product_id,
                Size = v.size.ToString(),
                Color = v.color.ToString(),
                Sku = v.sku,
                PriceAdjustment = v.price_adjustment,
                StockQuantity = v.stock_quantity,
                IsActive = v.is_active
            })
            .ToListAsync();
        return Ok(variants);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<ProductVariantDto>> GetById(int id)
    {
        var v = await _db.Product_variants.FindAsync(id);
        if (v == null) return NotFound();

        return Ok(new ProductVariantDto
        {
            Id = v.id,
            ProductId = v.product_id,
            Size = v.size.ToString(),
            Color = v.color.ToString(),
            Sku = v.sku,
            PriceAdjustment = v.price_adjustment,
            StockQuantity = v.stock_quantity,
            IsActive = v.is_active
        });
    }

    [HttpPost]
    [Authorize(Roles = "Admin")]
    public async Task<ActionResult<ProductVariantDto>> Create(CreateProductVariantDto dto)
    {
        var variant = new Product_variant
        {
            product_id = dto.ProductId,
            size = Enum.Parse<size_enum>(dto.Size),
            color = Enum.Parse<color_enum>(dto.Color),
            sku = dto.Sku,
            price_adjustment = dto.PriceAdjustment,
            stock_quantity = dto.StockQuantity,
            is_active = dto.IsActive
        };
        _db.Product_variants.Add(variant);
        await _db.SaveChangesAsync();

        return Ok(new ProductVariantDto
        {
            Id = variant.id,
            ProductId = variant.product_id,
            Size = variant.size.ToString(),
            Color = variant.color.ToString(),
            Sku = variant.sku,
            PriceAdjustment = variant.price_adjustment,
            StockQuantity = variant.stock_quantity,
            IsActive = variant.is_active
        });
    }

    [HttpPut("{id}")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> Update(int id, UpdateProductVariantDto dto)
    {
        var variant = await _db.Product_variants.FindAsync(id);
        if (variant == null) return NotFound();

        variant.size = Enum.Parse<size_enum>(dto.Size);
        variant.color = Enum.Parse<color_enum>(dto.Color);
        variant.sku = dto.Sku;
        variant.price_adjustment = dto.PriceAdjustment;
        variant.stock_quantity = dto.StockQuantity;
        variant.is_active = dto.IsActive;
        variant.updated_at = DateTime.UtcNow;

        await _db.SaveChangesAsync();
        return NoContent();
    }

    [HttpDelete("{id}")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> Delete(int id)
    {
        var variant = await _db.Product_variants.FindAsync(id);
        if (variant == null) return NotFound();

        _db.Product_variants.Remove(variant);
        await _db.SaveChangesAsync();
        return NoContent();
    }
}