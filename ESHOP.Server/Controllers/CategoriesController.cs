using ESHOP.Core;
using ESHOP.Core.Models;
using ESHOP.Server.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ESHOP.Server.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CategoriesController : ControllerBase
{
    private readonly EshopContext _db;
    public CategoriesController(EshopContext db) => _db = db;

    [HttpGet]
    public async Task<ActionResult<IEnumerable<CategoryDto>>> GetAll()
    {
        var categories = await _db.Categories
            .Select(c => new CategoryDto
            {
                Id = c.id,
                Name = c.name,
                Slug = c.slug,
                Description = c.description,
                ParentCategoryId = c.parent_category_id,
                ImageUrl = c.image_url,
                CreatedAt = c.created_at
            })
            .ToListAsync();
        return Ok(categories);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<CategoryDto>> GetById(int id)
    {
        var c = await _db.Categories.FindAsync(id);
        if (c == null) return NotFound();

        return Ok(new CategoryDto
        {
            Id = c.id,
            Name = c.name,
            Slug = c.slug,
            Description = c.description,
            ParentCategoryId = c.parent_category_id,
            ImageUrl = c.image_url,
            CreatedAt = c.created_at
        });
    }

    [HttpPost]
    [Authorize(Roles = "Admin")]
    public async Task<ActionResult<CategoryDto>> Create(CreateCategoryDto dto)
    {
        var category = new Category
        {
            name = dto.Name,
            slug = dto.Slug,
            description = dto.Description,
            parent_category_id = dto.ParentCategoryId,
            image_url = dto.ImageUrl
        };
        _db.Categories.Add(category);
        await _db.SaveChangesAsync();

        return CreatedAtAction(nameof(GetById), new { id = category.id }, new CategoryDto
        {
            Id = category.id,
            Name = category.name,
            Slug = category.slug,
            Description = category.description,
            ParentCategoryId = category.parent_category_id,
            ImageUrl = category.image_url,
            CreatedAt = category.created_at
        });
    }

    [HttpPut("{id}")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> Update(int id, UpdateCategoryDto dto)
    {
        var category = await _db.Categories.FindAsync(id);
        if (category == null) return NotFound();

        category.name = dto.Name;
        category.slug = dto.Slug;
        category.description = dto.Description;
        category.parent_category_id = dto.ParentCategoryId;
        category.image_url = dto.ImageUrl;

        await _db.SaveChangesAsync();
        return NoContent();
    }

    [HttpDelete("{id}")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> Delete(int id)
    {
        var category = await _db.Categories.FindAsync(id);
        if (category == null) return NotFound();

        _db.Categories.Remove(category);
        await _db.SaveChangesAsync();
        return NoContent();
    }
}