using ESHOP.Server.Models;
using ESHOP.Core;
using ESHOP.Core.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Runtime.CompilerServices;
using System.Security.Claims;
using System.Text;

namespace ESHOP.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private EshopContext _db;
        private IConfiguration _config;

        public AuthController(EshopContext db, IConfiguration config)
        {
            _db = db;
            _config = config;
        }

       
        [HttpPost("register")]
        public async Task<IActionResult>Register([FromBody] RegisterDto dto)
        {
            if (_db.Users.Any(u => u.email == dto.Email))
            return BadRequest("Uzivatel uz existuje!!!");

            var user = new User
            {
                email = dto.Email,
                password_hash = BCrypt.Net.BCrypt.HashPassword(dto.Password),
                first_name = dto.FirstName,
                last_name = dto.LastName,
                phone = dto.Phone,
                is_admin = true
            };

            _db.Users.Add(user);
            await _db.SaveChangesAsync();

            var token = GenerateJwtToken(user);
            return Ok(new{token});
        }

        
        

        [HttpPost("login")]
        public async Task<IActionResult>Login([FromBody] LoginDto dto)
        {
            var user = _db.Users.FirstOrDefault(u => u.email == dto.Email);
            if (user == null || !BCrypt.Net.BCrypt.Verify(dto.Password, user.password_hash))
            return Unauthorized("Zadejte spravne udaje!!!");

            var token = GenerateJwtToken(user);
            return Ok(new{token});
        }

        
        

        [HttpGet("me")]
        public IActionResult GetMe()
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            var email = User.FindFirst(ClaimTypes.Email)?.Value;
            return Ok(new{userId, email});
        }

        private string GenerateJwtToken(User user)
        {
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]!));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var claims = new[]
            {
                new Claim(ClaimTypes.NameIdentifier, user.id.ToString()),
                new Claim(ClaimTypes.Email, user.email),
                new Claim(ClaimTypes.Role, user.is_admin ? "Admin" : "User")
            };

            var token = new JwtSecurityToken
            (
                issuer: _config["Jwt:Issuer"],
                audience: _config["Jwt:Audience"],
                claims: claims,
                expires: DateTime.UtcNow.AddHours(2),
                signingCredentials: creds
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}