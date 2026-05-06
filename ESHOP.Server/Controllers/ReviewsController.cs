using ESHOP.Core;
using ESHOP.Core.Models;
using ESHOP.Server.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace ESHOP.Server.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ReviewsController : ControllerBase
{
    private readonly EshopContext _db;
    public ReviewsController(EshopContext db) => _db = db;

    // Veřejné schválené recenze pro produkt
    [HttpGet("product/{productId}")]
    public async Task<ActionResult<IEnumerable<ReviewDto>>> GetByProduct(int productId)
    {
        var reviews = await _db.Reviews
            .Where(r => r.product_id == productId && r.is_approved)
            .Include(r => r.User)
            .Select(r => new ReviewDto
            {
                Id = r.id,
                UserName = r.User.first_name + " " + r.User.last_name,
                Rating = r.rating,
                Title = r.title,
                Comment = r.comment,
                CreatedAt = r.created_at
            })
            .ToListAsync();
        return Ok(reviews);
    }

    // Přidání recenze (pouze přihlášený uživatel)
    [HttpPost]
    [Authorize]
    public async Task<ActionResult<ReviewDto>> Create(CreateReviewDto dto)
    {
        var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);

        // Kontrola, zda uživatel již nerecenzoval tento produkt
        var existing = await _db.Reviews.FirstOrDefaultAsync(r => r.user_id == userId && r.product_id == dto.ProductId);
        if (existing != null)
            return BadRequest("Již jste tento produkt recenzovali.");

        var review = new Review
        {
            user_id = userId,
            product_id = dto.ProductId,
            rating = dto.Rating,
            title = dto.Title,
            comment = dto.Comment,
            is_approved = false   // čeká na schválení adminem
        };
        _db.Reviews.Add(review);
        await _db.SaveChangesAsync();

        return Ok(new { Message = "Recenze byla odeslána ke schválení." });
    }

    // Admin: získání neschválených recenzí
    [HttpGet("pending")]
    [Authorize(Roles = "Admin")]
    public async Task<ActionResult<IEnumerable<ReviewDto>>> GetPending()
    {
        var reviews = await _db.Reviews
            .Where(r => !r.is_approved)
            .Include(r => r.User)
            .Include(r => r.Product)
            .Select(r => new ReviewDto
            {
                Id = r.id,
                UserName = r.User.email,
                ProductName = r.Product.name,
                Rating = r.rating,
                Title = r.title,
                Comment = r.comment,
                CreatedAt = r.created_at,
                IsApproved = r.is_approved
            })
            .ToListAsync();
        return Ok(reviews);
    }

    // Admin: schválení recenze
    [HttpPatch("{id}/approve")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> Approve(int id)
    {
        var review = await _db.Reviews.FindAsync(id);
        if (review == null) return NotFound();
        review.is_approved = true;
        await _db.SaveChangesAsync();
        return NoContent();
    }

    // Admin: smazání recenze
    [HttpDelete("{id}")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> Delete(int id)
    {
        var review = await _db.Reviews.FindAsync(id);
        if (review == null) return NotFound();
        _db.Reviews.Remove(review);
        await _db.SaveChangesAsync();
        return NoContent();
    }
}