using ESHOP.Core;
using ESHOP.Core.Enums;
using ESHOP.Core.Models;
using ESHOP.Server.Models;
using Microsoft.AspNetCore.Authorization;
using ESHOP.Server.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace ESHOP.Server.Controllers;

[ApiController]
[Route("api/[controller]")]
public class OrdersController : ControllerBase
{
    private readonly EshopContext _db;
    public OrdersController(EshopContext db) => _db = db;

    // Získání aktuálního košíku přihlášeného uživatele
    [HttpGet("cart")]
    [Authorize]
    public async Task<ActionResult<OrderDto>> GetCart()
    {
        var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
        var cart = await _db.Orders
            .Include(o => o.Order_items)
            .ThenInclude(oi => oi.Product_variant)
            .ThenInclude(pv => pv.Product)
            .FirstOrDefaultAsync(o => o.user_id == userId && o.order_status == order_status_enum.Cart);

        if (cart == null)
        {
            cart = new Order
            {
                user_id = userId,
                order_status = order_status_enum.Cart,
                created_at = DateTime.UtcNow
            };
            _db.Orders.Add(cart);
            await _db.SaveChangesAsync();
        }

        return Ok(MapToDto(cart));
    }

    // Přidání položky do košíku
    [HttpPost("cart/items")]
    [Authorize]
    public async Task<IActionResult> AddToCart([FromBody] AddToCartDto dto)
    {
        var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
        var cart = await _db.Orders
            .Include(o => o.Order_items)
            .FirstOrDefaultAsync(o => o.user_id == userId && o.order_status == order_status_enum.Cart);

        if (cart == null)
        {
            cart = new Order
            {
                user_id = userId,
                order_status = order_status_enum.Cart,
                created_at = DateTime.UtcNow
            };
            _db.Orders.Add(cart);
            await _db.SaveChangesAsync();
        }

        var variant = await _db.Product_variants.FindAsync(dto.ProductVariantId);
        if (variant == null) return BadRequest("Variant neexistuje.");
        if (variant.stock_quantity < dto.Quantity) return BadRequest("Nedostatečné množství na skladě.");

        var existingItem = cart.Order_items.FirstOrDefault(oi => oi.product_variant_id == dto.ProductVariantId);
        if (existingItem != null)
        {
            existingItem.quantity += dto.Quantity;
            existingItem.total_price = existingItem.unit_price * existingItem.quantity;
        }
        else
        {
            var unitPrice = variant.Product.base_price + (variant.price_adjustment ?? 0);
            cart.Order_items.Add(new Order_item
            {
                product_variant_id = dto.ProductVariantId,
                quantity = dto.Quantity,
                unit_price = unitPrice,
                total_price = unitPrice * dto.Quantity
            });
        }

        await _db.SaveChangesAsync();
        return Ok();
    }

    // Dokončení objednávky (checkout)
    [HttpPost("cart/checkout")]
    [Authorize]
    public async Task<IActionResult> Checkout([FromBody] CheckoutDto dto)
    {
        var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
        var cart = await _db.Orders
            .Include(o => o.Order_items)
            .ThenInclude(oi => oi.Product_variant)
            .FirstOrDefaultAsync(o => o.user_id == userId && o.order_status == order_status_enum.Cart);

        if (cart == null || !cart.Order_items.Any())
            return BadRequest("Košík je prázdný.");

        // Ověření dostupnosti
        foreach (var item in cart.Order_items)
        {
            if (item.Product_variant.stock_quantity < item.quantity)
                return BadRequest($"Nedostatečné množství pro variantu {item.Product_variant.sku}");
        }

        // Aktualizace skladu
        foreach (var item in cart.Order_items)
        {
            item.Product_variant.stock_quantity -= item.quantity;
        }

        cart.order_status = order_status_enum.Pending;
        cart.order_number = GenerateOrderNumber();
        cart.shipping_address_id = dto.ShippingAddressId;
        cart.billing_address_id = dto.BillingAddressId;
        cart.payment_method = dto.PaymentMethod;
        cart.payment_status = "pending";
        cart.total_amount = cart.Order_items.Sum(i => i.total_price);
        cart.shipping_amount = dto.ShippingAmount;
        cart.tax_amount = dto.TaxAmount;
        cart.updated_at = DateTime.UtcNow;

        await _db.SaveChangesAsync();
        return Ok(new { OrderNumber = cart.order_number });
    }

    // Historie objednávek uživatele
    [HttpGet("my")]
    [Authorize]
    public async Task<ActionResult<IEnumerable<OrderDto>>> GetMyOrders()
    {
        var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
        var orders = await _db.Orders
            .Where(o => o.user_id == userId && o.order_status != order_status_enum.Cart)
            .Include(o => o.Order_items)
            .ThenInclude(oi => oi.Product_variant)
            .ThenInclude(pv => pv.Product)
            .OrderByDescending(o => o.created_at)
            .ToListAsync();

        return Ok(orders.Select(MapToDto));
    }

    // Admin: všechny objednávky
    [HttpGet]
    [Authorize(Roles = "Admin")]
    public async Task<ActionResult<IEnumerable<OrderDto>>> GetAllOrders()
    {
        var orders = await _db.Orders
            .Where(o => o.order_status != order_status_enum.Cart)
            .Include(o => o.User)
            .Include(o => o.Order_items)
            .ToListAsync();

        return Ok(orders.Select(MapToDto));
    }

    // Admin: změna stavu objednávky
    [HttpPatch("{id}/status")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> UpdateStatus(int id, [FromBody] UpdateOrderStatusDto dto)
    {
        var order = await _db.Orders.FindAsync(id);
        if (order == null) return NotFound();
        order.order_status = Enum.Parse<order_status_enum>(dto.Status);
        order.updated_at = DateTime.UtcNow;
        await _db.SaveChangesAsync();
        return NoContent();
    }

    // CSV export – ROZŠIŘUJÍCÍ FUNKCE
    [HttpGet("export/csv")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> ExportCsv([FromServices] CsvExportService csvService)
    {
        var orders = await _db.Orders
            .Where(o => o.order_status != order_status_enum.Cart)
            .Include(o => o.User)
            .ToListAsync();

        var csvData = csvService.ExportOrdersToCsv(orders);
        return File(csvData, "text/csv", $"orders_{DateTime.Now:yyyyMMdd_HHmmss}.csv");
    }

    // pomocné metody
    private string GenerateOrderNumber() => $"ORD-{DateTime.Now:yyyyMMddHHmmss}-{new Random().Next(1000, 9999)}";

    private OrderDto MapToDto(Order o)
    {
        return new OrderDto
        {
            Id = o.id,
            OrderNumber = o.order_number,
            Status = o.order_status.ToString(),
            CreatedAt = o.created_at,
            TotalAmount = o.total_amount,
            Items = o.Order_items?.Select(i => new OrderItemDto
            {
                ProductName = i.Product_variant.Product.name,
                Size = i.Product_variant.size.ToString(),
                Color = i.Product_variant.color.ToString(),
                Quantity = i.quantity,
                UnitPrice = i.unit_price,
                TotalPrice = i.total_price
            }).ToList() ?? new List<OrderItemDto>()
        };
    }
}