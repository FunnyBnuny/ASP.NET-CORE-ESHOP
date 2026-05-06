using ESHOP.Core;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using System;
using System.Text;

namespace ESHOP.Server
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.

            builder.Services.AddControllers();
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            /* builder.Services.AddDbContext<EshopContext>(options =>
             {
                 options.UseMySQL(builder.Configuration.GetConnectionString("Primary"));
             });*/

            builder.Services.AddDbContext<EshopContext>(options =>
            options.UseInMemoryDatabase("EshopDb"));

            var jwtKey = builder.Configuration["Jwt:Key"]!;
            builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme).AddJwtBearer(options =>{ options.TokenValidationParameters = new TokenValidationParameters
                 {
                        ValidateIssuer = true,
                        ValidIssuer = builder.Configuration["Jwt:Issuer"],
                        ValidateAudience = true,
                        ValidAudience = builder.Configuration["Jwt:Audience"],
                        ValidateIssuerSigningKey = true,
                        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtKey)),
                        ValidateLifetime = true
                  };
            });

            builder.Services.AddAuthorization();

            builder.Services.AddControllers();
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen(options =>
            {
                
                options.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
                {
                    Description = "Vloz token: Bearer {token}",
                    Name = "Authorization",
                    In = ParameterLocation.Header,
                    Type = SecuritySchemeType.ApiKey,
                    Scheme = "Bearer"
                });

              
                options.AddSecurityRequirement(new OpenApiSecurityRequirement
                {
                  {
                   new OpenApiSecurityScheme{
                       Reference = new OpenApiReference
                       {
                            Type = ReferenceType.SecurityScheme,
                            Id = "Bearer"
                       }
                    },
                    new List<string>()
                   }
                });
            });

            var app = builder.Build();

            
            app.UseDefaultFiles();
            app.UseStaticFiles();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseHttpsRedirection();

            app.UseAuthorization();


            app.MapControllers();

            app.MapFallbackToFile("/index.html");

            app.Run();
        }
    }
}
