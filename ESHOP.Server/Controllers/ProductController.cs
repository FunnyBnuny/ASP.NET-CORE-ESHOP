using ESHOP.Server.Models;
using ESHOP.Core;
using ESHOP.Core.Models;
using ESHOP.Server.Managers;
using Microsoft.AspNetCore.Authorization;   
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;

namespace Eshop.Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductsController : ControllerBase
    {
        private EshopContext _db;

        public ProductsController(EshopContext db)
        {
            _db = db;
        }

        
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ProductDto>>> GetAll()
        {
            var products = await _db.Products.Select(p => new ProductDto
                {
                    Id = p.id,
                    Name = p.name,
                    Slug = p.slug,
                    Description = p.description,
                    BasePrice = p.base_price,
                    DiscountPrice = p.discount_price,
                    IsActive = p.is_active,
                    IsFeatured = p.is_featured,
                    Details = p.details,
                    CreatedAt = p.created_at
                }
            ).ToListAsync();

            return Ok(products);
        }

        
        [HttpGet("{id}")]
        public async Task<ActionResult<ProductDto>> GetById(int id)
        {
            var product = await _db.Products.FindAsync(id);
            if (product == null) return NotFound();

            var dto = new ProductDto
            {
                Id = product.id,
                Name = product.name,
                Slug = product.slug,
                Description = product.description,
                BasePrice = product.base_price,
                DiscountPrice = product.discount_price,
                IsActive = product.is_active,
                IsFeatured = product.is_featured,
                Details = product.details,
                CreatedAt = product.created_at
            };
            return Ok(dto);
        }

        
        [HttpPost]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<ProductDto>> Create([FromBody] CreateProductDto dto)
        {
            var product = new Product
            {
                name = dto.Name,
                slug = dto.Slug,
                description = dto.Description,
                base_price = dto.BasePrice,
                discount_price = dto.DiscountPrice,
                details = dto.Details,
                is_active = dto.IsActive,
                is_featured = dto.IsFeatured
            };

            _db.Products.Add(product);
            await _db.SaveChangesAsync();

            var resultDto = new ProductDto
            {
                Id = product.id,
                Name = product.name,
                Slug = product.slug,
                Description = product.description,
                BasePrice = product.base_price,
                DiscountPrice = product.discount_price,
                IsActive = product.is_active,
                IsFeatured = product.is_featured,
                Details = product.details,
                CreatedAt = product.created_at
            };

            return CreatedAtAction(nameof(GetById), new { id = product.id }, resultDto);
        }

        
        [HttpPut("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> Update(int id, [FromBody] UpdateProductDto dto)
        {
            var product = await _db.Products.FindAsync(id);
            if (product == null) return NotFound();

            product.name = dto.Name;
            product.slug = dto.Slug;
            product.description = dto.Description;
            product.base_price = dto.BasePrice;
            product.discount_price = dto.DiscountPrice;
            product.details = dto.Details;
            product.is_active = dto.IsActive;
            product.is_featured = dto.IsFeatured;
            product.updated_at = DateTime.UtcNow;

            await _db.SaveChangesAsync();
            return NoContent();
        }

       
        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> Delete(int id)
        {
            var product = await _db.Products.FindAsync(id);
            if (product == null) return NotFound();

            _db.Products.Remove(product);
            await _db.SaveChangesAsync();
            return NoContent();
        }
    }
}