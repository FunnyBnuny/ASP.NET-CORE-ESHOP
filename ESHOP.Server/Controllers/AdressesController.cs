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
[Authorize]
public class AddressesController : ControllerBase
{
    private readonly EshopContext _db;
    public AddressesController(EshopContext db) => _db = db;

    private int UserId => int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);

    [HttpGet]
    public async Task<ActionResult<IEnumerable<AddressDto>>> GetMyAddresses()
    {
        var addresses = await _db.Addresses
            .Where(a => a.user_id == UserId)
            .Select(a => new AddressDto
            {
                Id = a.id,
                AddressLine1 = a.address_line1,
                AddressLine2 = a.address_line2,
                City = a.city,
                State = a.state,
                PostalCode = a.postal_code,
                Country = a.country,
                IsDefaultShipping = a.is_default_shipping,
                IsDefaultBilling = a.is_default_billing
            })
            .ToListAsync();
        return Ok(addresses);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<AddressDto>> GetById(int id)
    {
        var a = await _db.Addresses.FirstOrDefaultAsync(a => a.id == id && a.user_id == UserId);
        if (a == null) return NotFound();

        return Ok(new AddressDto
        {
            Id = a.id,
            AddressLine1 = a.address_line1,
            AddressLine2 = a.address_line2,
            City = a.city,
            State = a.state,
            PostalCode = a.postal_code,
            Country = a.country,
            IsDefaultShipping = a.is_default_shipping,
            IsDefaultBilling = a.is_default_billing
        });
    }

    [HttpPost]
    public async Task<ActionResult<AddressDto>> Create(CreateAddressDto dto)
    {
        var address = new Address
        {
            user_id = UserId,
            address_line1 = dto.AddressLine1,
            address_line2 = dto.AddressLine2,
            city = dto.City,
            state = dto.State,
            postal_code = dto.PostalCode,
            country = dto.Country,
            is_default_shipping = dto.IsDefaultShipping,
            is_default_billing = dto.IsDefaultBilling
        };

        // Pokud je tato adresa výchozí, odstraníme výchozí příznak u ostatních adres uživatele
        if (dto.IsDefaultShipping)
        {
            var others = await _db.Addresses.Where(a => a.user_id == UserId && a.is_default_shipping).ToListAsync();
            others.ForEach(a => a.is_default_shipping = false);
        }
        if (dto.IsDefaultBilling)
        {
            var others = await _db.Addresses.Where(a => a.user_id == UserId && a.is_default_billing).ToListAsync();
            others.ForEach(a => a.is_default_billing = false);
        }

        _db.Addresses.Add(address);
        await _db.SaveChangesAsync();

        return CreatedAtAction(nameof(GetById), new { id = address.id }, new AddressDto
        {
            Id = address.id,
            AddressLine1 = address.address_line1,
            AddressLine2 = address.address_line2,
            City = address.city,
            State = address.state,
            PostalCode = address.postal_code,
            Country = address.country,
            IsDefaultShipping = address.is_default_shipping,
            IsDefaultBilling = address.is_default_billing
        });
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, UpdateAddressDto dto)
    {
        var address = await _db.Addresses.FirstOrDefaultAsync(a => a.id == id && a.user_id == UserId);
        if (address == null) return NotFound();

        address.address_line1 = dto.AddressLine1;
        address.address_line2 = dto.AddressLine2;
        address.city = dto.City;
        address.state = dto.State;
        address.postal_code = dto.PostalCode;
        address.country = dto.Country;
        address.is_default_shipping = dto.IsDefaultShipping;
        address.is_default_billing = dto.IsDefaultBilling;

        if (dto.IsDefaultShipping)
        {
            var others = await _db.Addresses.Where(a => a.user_id == UserId && a.id != id && a.is_default_shipping).ToListAsync();
            others.ForEach(a => a.is_default_shipping = false);
        }
        if (dto.IsDefaultBilling)
        {
            var others = await _db.Addresses.Where(a => a.user_id == UserId && a.id != id && a.is_default_billing).ToListAsync();
            others.ForEach(a => a.is_default_billing = false);
        }

        await _db.SaveChangesAsync();
        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var address = await _db.Addresses.FirstOrDefaultAsync(a => a.id == id && a.user_id == UserId);
        if (address == null) return NotFound();

        _db.Addresses.Remove(address);
        await _db.SaveChangesAsync();
        return NoContent();
    }
}